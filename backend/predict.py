import joblib
import numpy as np

from patient_feature_extractor import extract_patient_features

# -----------------------------
# Load Models
# -----------------------------

models = {

    "Decision Tree": joblib.load(
        "model/decision_tree_patient.pkl"
    ),

    "Random Forest": joblib.load(
        "model/random_forest_patient.pkl"
    ),

    "SVM": joblib.load(
        "model/svm_patient.pkl"
    ),

    "KNN": joblib.load(
        "model/knn_patient.pkl"
    ),

    "Logistic Regression": joblib.load(
        "model/logistic_regression_patient.pkl"
    ),

}


def predict(filepath, model_name):

    if model_name not in models:
        raise ValueError(f"Unknown model: {model_name}")

    features = extract_patient_features(filepath)

    model = models[model_name]

    prediction = model.predict(
        features.reshape(1, -1)
    )[0]

    # ----------------------------------
    # Confidence
    # ----------------------------------

    if hasattr(model, "predict_proba"):

        probabilities = model.predict_proba(
            features.reshape(1, -1)
        )[0]

        confidence = float(np.max(probabilities) * 100)

    else:

        confidence = 100.0

    labels = {

        "AD": "Alzheimer's Disease",

        "Healthy": "Healthy Control"

    }

    prediction = labels.get(
        prediction,
        prediction
    )

    return {

        "prediction": prediction,

        "confidence": round(confidence, 2),

        "model": model_name

    }