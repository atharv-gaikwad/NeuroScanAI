import os
import json
import joblib
import numpy as np
import matplotlib.pyplot as plt

from tensorflow.keras.models import load_model

from sklearn.model_selection import train_test_split

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
)

print("=" * 60)
print("NEUROSCAN AI")
print("PATIENT CLASSIFICATION")
print("=" * 60)

os.makedirs("model", exist_ok=True)

# -------------------------------------------------------
# Load Dataset
# -------------------------------------------------------

print("\nLoading Patient Dataset...\n")

X = np.load("patient_signals.npy")
y = np.load("patient_labels.npy")

print("Patient Signals :", X.shape)
print("Patient Labels  :", y.shape)

# -------------------------------------------------------
# Patient Split
# -------------------------------------------------------

X_train_patients, X_test_patients, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.20,

    random_state=42,

    stratify=y

)

print("\nPatient Split Complete")

print("Train :", len(X_train_patients))
print("Test  :", len(X_test_patients))

# -------------------------------------------------------
# Load Encoder
# -------------------------------------------------------

print("\nLoading Encoder...\n")

encoder = load_model("model/encoder.keras")

channel_mean = np.load(
    "model/channel_mean.npy"
)

channel_std = np.load(
    "model/channel_std.npy"
)

print("Encoder Loaded")

# -------------------------------------------------------
# Feature Generator
# -------------------------------------------------------

def generate_patient_features(patient):

    embeddings = []

    for channel in patient:

        channel = (
            channel - channel_mean
        ) / channel_std

        latent = encoder.predict(

            channel.reshape(1, -1),

            verbose=0

        )[0]

        embeddings.append(latent)

    embeddings = np.array(embeddings)

    features = embeddings.flatten()

    return features

print("\nGenerating Train Features...\n")

X_train = []

for patient in X_train_patients:

    X_train.append(
        generate_patient_features(patient)
    )

X_train = np.array(X_train)

print("Train Feature Shape :", X_train.shape)

print("\nGenerating Test Features...\n")

X_test = []

for patient in X_test_patients:

    X_test.append(
        generate_patient_features(patient)
    )

X_test = np.array(X_test)

print("Test Feature Shape :", X_test.shape)

# -------------------------------------------------------
# Models
# -------------------------------------------------------

models = {

    "Decision Tree": DecisionTreeClassifier(
        random_state=42
    ),

    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        n_jobs=-1
    ),

    "SVM": SVC(
        kernel="linear",
        probability=True,
        random_state=42
    ),

    "KNN": KNeighborsClassifier(
        n_neighbors=5
    ),

    "Logistic Regression": LogisticRegression(
        max_iter=5000,
        random_state=42
    )

}

results = {}

# -------------------------------------------------------
# Train Models
# -------------------------------------------------------

for name, model in models.items():

    print("\n" + "=" * 60)
    print(name)
    print("=" * 60)

    model.fit(
        X_train,
        y_train
    )

    prediction = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        prediction
    )

    precision = precision_score(
        y_test,
        prediction,
        average="weighted"
    )

    recall = recall_score(
        y_test,
        prediction,
        average="weighted"
    )

    f1 = f1_score(
        y_test,
        prediction,
        average="weighted"
    )

    results[name] = {

        "accuracy": float(accuracy),

        "precision": float(precision),

        "recall": float(recall),

        "f1_score": float(f1)

    }

    print(f"\nAccuracy  : {accuracy:.4f}")
    print(f"Precision : {precision:.4f}")
    print(f"Recall    : {recall:.4f}")
    print(f"F1 Score  : {f1:.4f}")

    print("\nClassification Report\n")

    print(

        classification_report(

            y_test,

            prediction

        )

    )

    cm = confusion_matrix(

        y_test,

        prediction

    )

    disp = ConfusionMatrixDisplay(

        confusion_matrix=cm,

        display_labels=model.classes_

    )

    plt.figure(figsize=(6,6))

    disp.plot(cmap="Blues")

    plt.title(name)

    filename = (

        name

        .lower()

        .replace(" ", "_")

    )

    plt.savefig(

        f"model/{filename}_confusion_matrix.png",

        dpi=300,

        bbox_inches="tight"

    )

    plt.close()

    joblib.dump(

        model,

        f"model/{filename}_patient.pkl"

    )

    print("✓ Model Saved")

    print("✓ Confusion Matrix Saved")

    # -------------------------------------------------------
# Save Metrics
# -------------------------------------------------------

print("\nSaving Metrics...\n")

with open(
    "model/metrics.json",
    "w"
) as file:

    json.dump(
        results,
        file,
        indent=4
    )

print("✓ metrics.json Saved")

# -------------------------------------------------------
# Display Final Results
# -------------------------------------------------------

print("\n" + "=" * 70)
print("FINAL MODEL PERFORMANCE")
print("=" * 70)

sorted_results = sorted(
    results.items(),
    key=lambda x: x[1]["accuracy"],
    reverse=True
)

for rank, (name, metric) in enumerate(sorted_results, start=1):

    print(f"\n#{rank} {name}")

    print(f"Accuracy  : {metric['accuracy']:.4f}")
    print(f"Precision : {metric['precision']:.4f}")
    print(f"Recall    : {metric['recall']:.4f}")
    print(f"F1 Score  : {metric['f1_score']:.4f}")

best_model = sorted_results[0]

print("\n" + "=" * 70)
print("RECOMMENDED MODEL")
print("=" * 70)

print(f"\nBest Model : {best_model[0]}")
print(f"Accuracy   : {best_model[1]['accuracy']:.4f}")

# -------------------------------------------------------
# Save Recommended Model
# -------------------------------------------------------

recommended_model = best_model[0].lower().replace(" ", "_")

recommended_info = {
    "recommended_model": best_model[0],
    "model_file": f"{recommended_model}_patient.pkl",
    "accuracy": best_model[1]["accuracy"]
}

with open(
    "model/recommended_model.json",
    "w"
) as file:

    json.dump(
        recommended_info,
        file,
        indent=4
    )

print("✓ recommended_model.json Saved")

print("\nTraining Completed Successfully.")

# -------------------------------------------------------
# Verify Saved Models
# -------------------------------------------------------

print("\n" + "=" * 70)
print("VERIFYING SAVED MODELS")
print("=" * 70)

saved_models = [
    "decision_tree_patient.pkl",
    "random_forest_patient.pkl",
    "svm_patient.pkl",
    "knn_patient.pkl",
    "logistic_regression_patient.pkl"
]

for model_file in saved_models:

    path = os.path.join("model", model_file)

    if os.path.exists(path):
        print(f"✓ {model_file}")
    else:
        print(f"✗ {model_file} NOT FOUND")

print("\nGenerated Files")

generated_files = [
    "metrics.json",
    "recommended_model.json",
    "decision_tree_confusion_matrix.png",
    "random_forest_confusion_matrix.png",
    "svm_confusion_matrix.png",
    "knn_confusion_matrix.png",
    "logistic_regression_confusion_matrix.png"
]

for file in generated_files:

    path = os.path.join("model", file)

    if os.path.exists(path):
        print(f"✓ {file}")
    else:
        print(f"✗ {file} NOT FOUND")

print("\n" + "=" * 70)
print("PATIENT MODEL TRAINING COMPLETED")
print("=" * 70)

print(f"Training Patients : {len(X_train_patients)}")
print(f"Testing Patients  : {len(X_test_patients)}")
print(f"Feature Dimension : {X_train.shape[1]}")
print(f"Models Trained    : {len(models)}")

print("\nRecommended Model :", best_model[0])
print(f"Best Accuracy     : {best_model[1]['accuracy']:.4f}")

print("\nAll files successfully generated.")
print("NeuroScan AI patient classification pipeline is ready.")