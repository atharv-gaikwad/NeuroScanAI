import os

DATASET_PATH = "D:/"

subjects = []

for folder in os.listdir(DATASET_PATH):
    if folder.startswith("sub-"):
        subjects.append(folder)

print("Subjects Found:", len(subjects))

print(subjects[:10])