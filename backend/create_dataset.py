import os
import mne
import numpy as np
import pandas as pd
from scipy.signal import resample

# ==========================
# DATASET LOCATION
# ==========================

DATASET_PATH = r"D:\OpenNeuroDataset"

TARGET_LENGTH = 30000

ELECTRODES = [
    "Fp1","Fp2",
    "F3","F4",
    "C3","C4",
    "P3","P4",
    "O1","O2",
    "F7","F8",
    "T3","T4",
    "T5","T6",
    "Fz","Cz","Pz"
]

participants = pd.read_csv(
    os.path.join(DATASET_PATH, "participants.tsv"),
    sep="\t"
)

group_map = {
    "A": "AD",
    "C": "Healthy"
}

signals = []
labels = []

mne.set_log_level("WARNING")

print("\nLoading Dataset...\n")

for _, row in participants.iterrows():

    subject = row["participant_id"]
    group = row["Group"]

    if group not in group_map:
        continue

    eeg_file = os.path.join(
        DATASET_PATH,
        subject,
        "eeg",
        f"{subject}_task-eyesclosed_eeg.set"
    )

    if not os.path.exists(eeg_file):
        print("Missing:", subject)
        continue

    raw = mne.io.read_raw_eeglab(
        eeg_file,
        preload=True,
        verbose=False
    )

    for electrode in ELECTRODES:

        if electrode not in raw.ch_names:
            continue

        idx = raw.ch_names.index(electrode)

        signal = raw.get_data()[idx]

        signal = resample(signal, TARGET_LENGTH)

        signals.append(signal)

        labels.append(group_map[group])

    print(subject)

print("\nFinished")
print("Signals:", len(signals))
print("Labels:", len(labels))

np.save("raw_signals.npy", np.array(signals))
np.save("raw_labels.npy", np.array(labels))

print("\nSaved raw_signals.npy")
print("Saved raw_labels.npy")