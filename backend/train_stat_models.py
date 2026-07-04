import joblib
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

from sklearn.metrics import accuracy_score, classification_report

print("Loading Statistical Features...\n")

X = np.load("stat_features.npy")
y = np.load("stat_labels.npy")

print("Features :", X.shape)
print("Labels   :", y.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# ----------------------------
# Decision Tree
# ----------------------------

print("\n==============================")
print("Decision Tree")
print("==============================")

dt = DecisionTreeClassifier(random_state=42)
dt.fit(X_train, y_train)

pred = dt.predict(X_test)
dt_acc = accuracy_score(y_test, pred)

print("Accuracy:", dt_acc)
print(classification_report(y_test, pred))

joblib.dump(dt, "model/dt_stat.pkl")

# ----------------------------
# Random Forest
# ----------------------------

print("\n==============================")
print("Random Forest")
print("==============================")

rf = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

rf.fit(X_train, y_train)

pred = rf.predict(X_test)
rf_acc = accuracy_score(y_test, pred)

print("Accuracy:", rf_acc)
print(classification_report(y_test, pred))

joblib.dump(rf, "model/rf_stat.pkl")

# ----------------------------
# Scaling
# ----------------------------

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

joblib.dump(scaler, "model/stat_scaler.pkl")

# ----------------------------
# SVM
# ----------------------------

print("\n==============================")
print("SVM")
print("==============================")

svm = SVC(
    kernel="rbf",
    probability=True,
    random_state=42
)

svm.fit(X_train_scaled, y_train)

pred = svm.predict(X_test_scaled)
svm_acc = accuracy_score(y_test, pred)

print("Accuracy:", svm_acc)
print(classification_report(y_test, pred))

joblib.dump(svm, "model/svm_stat.pkl")

# ----------------------------
# KNN
# ----------------------------

print("\n==============================")
print("KNN")
print("==============================")

knn = KNeighborsClassifier(n_neighbors=5)

knn.fit(X_train_scaled, y_train)

pred = knn.predict(X_test_scaled)
knn_acc = accuracy_score(y_test, pred)

print("Accuracy:", knn_acc)
print(classification_report(y_test, pred))

joblib.dump(knn, "model/knn_stat.pkl")

# ----------------------------

print("\n==============================")
print("FINAL RESULTS")
print("==============================")

print(f"Decision Tree : {dt_acc:.4f}")
print(f"Random Forest : {rf_acc:.4f}")
print(f"SVM           : {svm_acc:.4f}")
print(f"KNN           : {knn_acc:.4f}")