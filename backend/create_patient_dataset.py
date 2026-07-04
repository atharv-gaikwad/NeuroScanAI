import os
import mne
import numpy as np
import pandas as pd
from scipy.signal import resample

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

patient_signals = []
patient_labels = []

mne.set_log_level("WARNING")

print("\nCreating Patient Dataset...\n")

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
        continue

    raw = mne.io.read_raw_eeglab(
        eeg_file,
        preload=True,
        verbose=False
    )

    patient = []

    for electrode in ELECTRODES:

        if electrode not in raw.ch_names:
            continue

        idx = raw.ch_names.index(electrode)

        signal = raw.get_data()[idx]

        signal = resample(signal, TARGET_LENGTH)

        patient.append(signal)

    patient = np.array(patient)

    if patient.shape[0] != 19:
        print(f"Skipping {subject} (missing channels)")
        continue

    patient_signals.append(patient)
    patient_labels.append(group_map[group])

    print(subject)

patient_signals = np.array(patient_signals)

patient_labels = np.array(patient_labels)

print("\nDataset Distribution")
unique, counts = np.unique(patient_labels, return_counts=True)

for u, c in zip(unique, counts):
    print(f"{u}: {c}")

print("\nFinished")

print("Patient Signals:", patient_signals.shape)

print("Patient Labels :", patient_labels.shape)

np.save("patient_signals.npy", patient_signals)

np.save("patient_labels.npy", patient_labels)

print("\nSaved patient_signals.npy")

print("Saved patient_labels.npy")