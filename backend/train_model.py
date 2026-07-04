import joblib
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

X = np.load("X.npy")
y = np.load("y.npy")

print("Dataset Loaded")
print(X.shape)
print(y.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining Random Forest...\n")

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

accuracy = accuracy_score(y_test, pred)

print("Accuracy:", accuracy)

print("\nClassification Report\n")

print(classification_report(y_test, pred))

print("\nConfusion Matrix\n")

print(confusion_matrix(y_test, pred))

joblib.dump(model, "model/model.pkl")

print("\nModel Saved -> model/model.pkl")