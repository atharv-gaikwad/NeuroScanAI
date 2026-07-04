import mne
import numpy as np


def extract_features(filepath):

    raw = mne.io.read_raw_eeglab(filepath, preload=True, verbose=False)

    raw.filter(0.5, 45, verbose=False)

    data = raw.get_data()

    features = []

    for channel in data:

        mean = np.mean(channel)

        std = np.std(channel)

        maximum = np.max(channel)

        minimum = np.min(channel)

        rms = np.sqrt(np.mean(channel ** 2))

        features.extend([
            mean,
            std,
            maximum,
            minimum,
            rms
        ])

    return np.array(features)