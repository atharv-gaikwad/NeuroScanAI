import os
import json
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

from sklearn.model_selection import train_test_split

from tensorflow.keras.models import Model
from tensorflow.keras.layers import (
    Input,
    Dense,
    Dropout
)

from tensorflow.keras.callbacks import (
    EarlyStopping,
    ReduceLROnPlateau,
    ModelCheckpoint
)

print("=" * 70)
print("NEUROSCAN AI")
print("SUPERVISED AUTOENCODER")
print("=" * 70)

os.makedirs("model", exist_ok=True)

# ----------------------------------------------------
# Load Dataset
# ----------------------------------------------------

print("\nLoading Patient Dataset...\n")

X = np.load("patient_signals.npy")
y = np.load("patient_labels.npy")

print("Patient Signals :", X.shape)
print("Patient Labels :", y.shape)

# ----------------------------------------------------
# Convert Labels
# ----------------------------------------------------

y_binary = np.where(y == "AD", 1, 0)

# ----------------------------------------------------
# Split Patients
# ----------------------------------------------------

X_train_patients, X_test_patients, y_train, y_test = train_test_split(

    X,

    y_binary,

    test_size=0.20,

    random_state=42,

    stratify=y_binary

)

print("\nPatient Split Completed")

print("Training :", len(X_train_patients))
print("Testing :", len(X_test_patients))

# ----------------------------------------------------
# Channel Dataset
# ----------------------------------------------------

train_channels = []
train_labels = []

for patient, label in zip(
    X_train_patients,
    y_train
):

    for channel in patient:

        train_channels.append(channel)

        train_labels.append(label)

train_channels = np.array(train_channels)

train_labels = np.array(train_labels)

print("\nTraining Channels :", train_channels.shape)
print("Training Labels :", train_labels.shape)

# ----------------------------------------------------
# Normalize
# ----------------------------------------------------

channel_mean = train_channels.mean(axis=0)

channel_std = train_channels.std(axis=0)

channel_std[channel_std == 0] = 1

train_channels = (
    train_channels - channel_mean
) / channel_std

np.save(
    "model/channel_mean.npy",
    channel_mean
)

np.save(
    "model/channel_std.npy",
    channel_std
)

input_dim = train_channels.shape[1]

print("Input Dimension :", input_dim)

# ----------------------------------------------------
# Build Supervised Autoencoder
# ----------------------------------------------------

print("\nBuilding Supervised Autoencoder...\n")

inputs = Input(
    shape=(input_dim,),
    name="EEG_Input"
)

# ====================================================
# Encoder
# ====================================================

x = Dense(
    256,
    activation="relu"
)(inputs)

x = Dropout(0.30)(x)

x = Dense(
    128,
    activation="relu"
)(x)

x = Dropout(0.25)(x)

x = Dense(
    64,
    activation="relu"
)(x)

latent = Dense(
    16,
    activation="relu",
    name="latent"
)(x)

# ====================================================
# Classification Head
# ====================================================

cls = Dense(
    32,
    activation="relu"
)(latent)

cls = Dropout(0.30)(cls)

classifier = Dense(
    1,
    activation="sigmoid",
    name="classifier"
)(cls)

# ====================================================
# Decoder
# ====================================================

x = Dense(
    64,
    activation="relu"
)(latent)

x = Dense(
    128,
    activation="relu"
)(x)

x = Dense(
    256,
    activation="relu"
)(x)

reconstruction = Dense(
    input_dim,
    activation="linear",
    name="reconstruction"
)(x)

# ====================================================
# Models
# ====================================================

autoencoder = Model(

    inputs=inputs,

    outputs=[
        reconstruction,
        classifier
    ],

    name="NeuroScanSupervisedAutoencoder"

)

encoder = Model(

    inputs=inputs,

    outputs=latent,

    name="NeuroScanEncoder"

)

print(autoencoder.summary())

# ----------------------------------------------------
# Compile
# ----------------------------------------------------

autoencoder.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),

    loss={
        "reconstruction": "mse",
        "classifier": "binary_crossentropy"
    },

    loss_weights={
        "reconstruction": 0.5,
        "classifier": 0.5
    },

    metrics={
        "classifier": ["accuracy"]
    }

)

# ----------------------------------------------------
# Callbacks
# ----------------------------------------------------

early_stop = EarlyStopping(

    monitor="val_loss",

    patience=15,

    restore_best_weights=True,

    verbose=1

)

reduce_lr = ReduceLROnPlateau(

    monitor="val_loss",

    factor=0.5,

    patience=5,

    min_lr=1e-6,

    verbose=1

)

checkpoint = ModelCheckpoint(

    "model/best_supervised_autoencoder.keras",

    monitor="val_loss",

    save_best_only=True,

    verbose=1

)

# ----------------------------------------------------
# Train Supervised Autoencoder
# ----------------------------------------------------

print("\nStarting Training...\n")

history = autoencoder.fit(

    x=train_channels,

    y={

        "reconstruction": train_channels,

        "classifier": train_labels

    },

    validation_split=0.20,

    epochs=150,

    batch_size=32,

    shuffle=True,

    callbacks=[

        early_stop,

        reduce_lr,

        checkpoint

    ],

    verbose=1

)

print("\nTraining Completed!")

# ----------------------------------------------------
# Save Models
# ----------------------------------------------------

print("\nSaving Models...\n")

autoencoder.save(
    "model/supervised_autoencoder.keras"
)

encoder.save(
    "model/encoder.keras"
)

print("✓ Supervised Autoencoder Saved")

print("✓ Encoder Saved")

# ----------------------------------------------------
# Save Training History
# ----------------------------------------------------

history_dict = {

    "loss": history.history["loss"],

    "val_loss": history.history["val_loss"],

    "reconstruction_loss":
        history.history["reconstruction_loss"],

    "val_reconstruction_loss":
        history.history["val_reconstruction_loss"],

    "classifier_loss":
        history.history["classifier_loss"],

    "val_classifier_loss":
        history.history["val_classifier_loss"],

    "classifier_accuracy":
        history.history["classifier_accuracy"],

    "val_classifier_accuracy":
        history.history["val_classifier_accuracy"]

}

with open(

    "model/history.json",

    "w"

) as f:

    json.dump(

        history_dict,

        f,

        indent=4

    )

print("✓ History Saved")

# ----------------------------------------------------
# Plot Training Curves
# ----------------------------------------------------

print("\nGenerating Training Graphs...\n")

# Total Loss
plt.figure(figsize=(10,5))

plt.plot(
    history.history["loss"],
    label="Training Loss",
    linewidth=2
)

plt.plot(
    history.history["val_loss"],
    label="Validation Loss",
    linewidth=2
)

plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Total Loss")
plt.grid(True)
plt.legend()

plt.savefig(
    "model/total_loss.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()

# --------------------------------------------
# Reconstruction Loss
# --------------------------------------------

plt.figure(figsize=(10,5))

plt.plot(
    history.history["reconstruction_loss"],
    label="Training",
    linewidth=2
)

plt.plot(
    history.history["val_reconstruction_loss"],
    label="Validation",
    linewidth=2
)

plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Reconstruction Loss")
plt.grid(True)
plt.legend()

plt.savefig(
    "model/reconstruction_loss.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()

# --------------------------------------------
# Classification Loss
# --------------------------------------------

plt.figure(figsize=(10,5))

plt.plot(
    history.history["classifier_loss"],
    label="Training",
    linewidth=2
)

plt.plot(
    history.history["val_classifier_loss"],
    label="Validation",
    linewidth=2
)

plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Classification Loss")
plt.grid(True)
plt.legend()

plt.savefig(
    "model/classifier_loss.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()

# --------------------------------------------
# Classification Accuracy
# --------------------------------------------

plt.figure(figsize=(10,5))

plt.plot(
    history.history["classifier_accuracy"],
    label="Training",
    linewidth=2
)

plt.plot(
    history.history["val_classifier_accuracy"],
    label="Validation",
    linewidth=2
)

plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.title("Classification Accuracy")
plt.grid(True)
plt.legend()

plt.savefig(
    "model/classifier_accuracy.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()

print("✓ Training Graphs Saved")

# ----------------------------------------------------
# Final Summary
# ----------------------------------------------------

print("\n" + "=" * 70)
print("SUPERVISED AUTOENCODER TRAINING COMPLETED")
print("=" * 70)

print(f"Training Patients : {len(X_train_patients)}")
print(f"Testing Patients  : {len(X_test_patients)}")
print(f"Training Channels : {len(train_channels)}")
print(f"Input Dimension   : {input_dim}")
print("Latent Dimension  : 16")

print("\nGenerated Files")

files = [
    "supervised_autoencoder.keras",
    "encoder.keras",
    "best_supervised_autoencoder.keras",
    "channel_mean.npy",
    "channel_std.npy",
    "history.json",
    "total_loss.png",
    "reconstruction_loss.png",
    "classifier_loss.png",
    "classifier_accuracy.png"
]

for file in files:

    path = os.path.join(
        "model",
        file
    )

    if os.path.exists(path):

        print(f"✓ {file}")

    else:

        print(f"✗ {file}")

print("\nEncoder Ready For Patient Classification.")