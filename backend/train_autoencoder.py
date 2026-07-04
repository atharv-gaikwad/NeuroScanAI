import os
import json
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split

from tensorflow.keras.models import Model
from tensorflow.keras.layers import (
    Input,
    Dense,
    Dropout,
)

from tensorflow.keras.callbacks import (
    EarlyStopping,
    ReduceLROnPlateau,
    ModelCheckpoint,
)

print("=" * 60)
print("NEUROSCAN AI")
print("PATIENT AUTOENCODER TRAINING")
print("=" * 60)

# -------------------------------------------------------
# Create Model Folder
# -------------------------------------------------------

os.makedirs("model", exist_ok=True)

# -------------------------------------------------------
# Load Dataset
# -------------------------------------------------------

print("\nLoading Patient Dataset...\n")

X = np.load("patient_signals.npy")
y = np.load("patient_labels.npy")

# ----------------------------------------
# Binary Labels
# ----------------------------------------

y_binary = np.where(
    y == "AD",
    1,
    0
)

print("Patient Signals :", X.shape)
print("Patient Labels  :", y.shape)

# -------------------------------------------------------
# Patient Level Split
# -------------------------------------------------------

X_train_patients, X_test_patients, y_train, y_test = train_test_split(
    X,
    y_binary,
    test_size=0.20,
    random_state=42,
    stratify=y_binary
)

print("\nPatient Split Completed")

print("Training Patients :", len(X_train_patients))
print("Testing Patients  :", len(X_test_patients))

# -------------------------------------------------------
# Convert Train Patients into Channel Dataset
# -------------------------------------------------------

print("\nPreparing Training Channels...\n")

train_channels = []

for patient in X_train_patients:

    for channel in patient:

        train_channels.append(channel)

train_channels = np.array(train_channels)

print("Training Channels :", train_channels.shape)

input_dim = train_channels.shape[1]

print("Signal Length :", input_dim)

# -------------------------------------------------------
# Normalize Training Channels
# -------------------------------------------------------

print("\nNormalizing EEG Signals...\n")

channel_mean = np.mean(train_channels, axis=0)

channel_std = np.std(train_channels, axis=0)

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

print("Normalization Complete")

# -------------------------------------------------------
# Build Autoencoder
# -------------------------------------------------------

print("\nBuilding Autoencoder...\n")

inputs = Input(
    shape=(input_dim,),
    name="EEG_Input"
)

# ==========================
# Encoder
# ==========================

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

bottleneck = Dense(
    16,
    activation="relu",
    name="bottleneck"
)(x)

# ==========================
# Decoder
# ==========================

x = Dense(
    64,
    activation="relu"
)(bottleneck)

x = Dense(
    128,
    activation="relu"
)(x)

x = Dense(
    256,
    activation="relu"
)(x)

outputs = Dense(
    input_dim,
    activation="linear",
    name="reconstruction"
)(x)

# -------------------------------------------------------
# Models
# -------------------------------------------------------

autoencoder = Model(
    inputs=inputs,
    outputs=outputs,
    name="NeuroScanAutoencoder"
)

encoder = Model(
    inputs=inputs,
    outputs=bottleneck,
    name="NeuroScanEncoder"
)

print(autoencoder.summary())

# -------------------------------------------------------
# Compile
# -------------------------------------------------------

optimizer = tf.keras.optimizers.Adam(
    learning_rate=0.001
)

autoencoder.compile(
    optimizer=optimizer,
    loss="mse",
    metrics=["mae"]
)

# -------------------------------------------------------
# Callbacks
# -------------------------------------------------------

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
    filepath="model/best_autoencoder.keras",
    monitor="val_loss",
    save_best_only=True,
    verbose=1
)

# -------------------------------------------------------
# Train Autoencoder
# -------------------------------------------------------

print("\nStarting Autoencoder Training...\n")

history = autoencoder.fit(

    train_channels,

    train_channels,

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

print("\nTraining Finished!")

# -------------------------------------------------------
# Save Models
# -------------------------------------------------------

print("\nSaving Models...\n")

autoencoder.save(
    "model/autoencoder.keras"
)

encoder.save(
    "model/encoder.keras"
)

print("✓ Autoencoder Saved")
print("✓ Encoder Saved")

# -------------------------------------------------------
# Save Normalization Parameters
# -------------------------------------------------------

np.save(
    "model/channel_mean.npy",
    channel_mean
)

np.save(
    "model/channel_std.npy",
    channel_std
)

print("✓ Normalization Parameters Saved")

# -------------------------------------------------------
# Save Training History
# -------------------------------------------------------

history_dict = {

    "loss": history.history["loss"],

    "val_loss": history.history["val_loss"],

    "mae": history.history["mae"],

    "val_mae": history.history["val_mae"]

}

with open(
    "model/history.json",
    "w"
) as file:

    json.dump(
        history_dict,
        file,
        indent=4
    )

print("✓ History Saved")

# -------------------------------------------------------
# Training Curves
# -------------------------------------------------------

print("\nGenerating Training Graph...\n")

plt.figure(figsize=(10, 5))

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
plt.title("Autoencoder Training Loss")
plt.legend()
plt.grid(True)

plt.savefig(
    "model/loss.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()

print("✓ loss.png Saved")

# -------------------------------------------------------
# Final Summary
# -------------------------------------------------------

print("\n" + "=" * 60)
print("AUTOENCODER TRAINING COMPLETED")
print("=" * 60)

print(f"Training Patients : {len(X_train_patients)}")
print(f"Testing Patients  : {len(X_test_patients)}")

print(f"Training Channels : {len(train_channels)}")

print(f"Input Dimension   : {input_dim}")
print("Latent Dimension  : 16")

print("\nFiles Generated")

print("--------------------------------")

print("model/autoencoder.keras")
print("model/encoder.keras")
print("model/best_autoencoder.keras")
print("model/channel_mean.npy")
print("model/channel_std.npy")
print("model/history.json")
print("model/loss.png")

print("--------------------------------")

print("\nAutoencoder Ready For Patient Classification.")