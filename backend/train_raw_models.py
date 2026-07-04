import joblib
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

print("Loading Raw EEG Dataset...\n")

X = np.load("raw_signals.npy")
y = np.load("raw_labels.npy")

print("Signals :", X.shape)
print("Labels  :", y.shape)

# ----------------------------
# Decision Tree
# ----------------------------

print("\n==============================")
print("Decision Tree")
print("==============================")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

dt = DecisionTreeClassifier(random_state=42)

dt.fit(X_train, y_train)

pred = dt.predict(X_test)

dt_acc = accuracy_score(y_test, pred)

print("Accuracy:", dt_acc)
print(classification_report(y_test, pred))
print(confusion_matrix(y_test, pred))

joblib.dump(dt, "model/dt_raw.pkl")

# ----------------------------
# Random Forest
# ----------------------------

print("\n==============================")
print("Random Forest")
print("==============================")

rf = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

rf.fit(X_train, y_train)

pred = rf.predict(X_test)

rf_acc = accuracy_score(y_test, pred)

print("Accuracy:", rf_acc)
print(classification_report(y_test, pred))
print(confusion_matrix(y_test, pred))

joblib.dump(rf, "model/rf_raw.pkl")

# ----------------------------
# SVM
# ----------------------------

print("\n==============================")
print("SVM")
print("==============================")

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

svm = SVC(
    kernel="linear",
    probability=True,
    random_state=42
)

svm.fit(X_train_scaled, y_train)

pred = svm.predict(X_test_scaled)

svm_acc = accuracy_score(y_test, pred)

print("Accuracy:", svm_acc)
print(classification_report(y_test, pred))
print(confusion_matrix(y_test, pred))

joblib.dump(svm, "model/svm_raw.pkl")
joblib.dump(scaler, "model/raw_scaler.pkl")

# ----------------------------
# KNN
# ----------------------------

print("\n==============================")
print("KNN")
print("==============================")

knn = KNeighborsClassifier(
    n_neighbors=5,
)

knn.fit(X_train_scaled, y_train)

pred = knn.predict(X_test_scaled)

knn_acc = accuracy_score(y_test, pred)

print("Accuracy:", knn_acc)
print(classification_report(y_test, pred))
print(confusion_matrix(y_test, pred))

joblib.dump(knn, "model/knn_raw.pkl")

# ----------------------------

print("\n==============================")
print("FINAL RESULTS")
print("==============================")

print(f"Decision Tree : {dt_acc:.4f}")
print(f"Random Forest : {rf_acc:.4f}")
print(f"SVM           : {svm_acc:.4f}")
print(f"KNN           : {knn_acc:.4f}")