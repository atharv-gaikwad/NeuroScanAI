import numpy as np
from scipy.stats import entropy, skew, kurtosis

print("Loading Raw EEG Dataset...\n")

signals = np.load("raw_signals.npy")
labels = np.load("raw_labels.npy")

print("Signals :", signals.shape)
print("Labels  :", labels.shape)


def extract_features(signal):

    probability = np.histogram(
        signal,
        bins=50,
        density=True
    )[0]

    return [
        np.mean(signal),
        np.std(signal),
        np.min(signal),
        np.max(signal),
        skew(signal),
        kurtosis(signal),
        entropy(probability + 1e-8)
    ]


print("\nExtracting Statistical Features...\n")

X = []

for i, signal in enumerate(signals):

    X.append(extract_features(signal))

    if (i + 1) % 100 == 0:
        print(f"{i+1}/{len(signals)} completed")

X = np.array(X)

print("\nFinished\n")

print("Feature Matrix :", X.shape)
print("Labels         :", labels.shape)

np.save("stat_features.npy", X)
np.save("stat_labels.npy", labels)

print("\nSaved stat_features.npy")
print("Saved stat_labels.npy")