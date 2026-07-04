import mne
import numpy as np

from scipy.signal import resample
from tensorflow.keras.models import load_model

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

print("Loading Encoder...")

encoder = load_model("model/encoder.keras")
channel_mean = np.load("model/channel_mean.npy")
channel_std = np.load("model/channel_std.npy")

print("Encoder Loaded")


def extract_patient_features(filepath):

    raw = mne.io.read_raw_eeglab(
        filepath,
        preload=True,
        verbose=False
    )

    patient_features = []

    for electrode in ELECTRODES:

        if electrode not in raw.ch_names:
            raise Exception(
                f"{electrode} channel missing."
            )

        idx = raw.ch_names.index(electrode)

        signal = raw.get_data()[idx]

        signal = resample(
            signal,
            TARGET_LENGTH
        )

        signal = (
            signal - channel_mean
        ) / channel_std

        latent = encoder.predict(
            signal.reshape(1, -1),
            verbose=0
        )[0]

        patient_features.extend(latent)

    return np.array(patient_features)