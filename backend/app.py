from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os
import shutil

from predict import predict
import json
from fastapi.responses import JSONResponse

app = FastAPI()
app.mount(
    "/images",
    StaticFiles(directory="images"),
    name="images",
)

# -------------------------------------------------------
# CORS
# -------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------
# Upload Folder
# -------------------------------------------------------

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# -------------------------------------------------------
# Home
# -------------------------------------------------------

@app.get("/")
def home():

    return {

        "message": "NeuroScan AI Backend Running"

    }

@app.get("/metrics")
def get_metrics():

    with open("model/metrics.json", "r") as file:

        metrics = json.load(file)

    return JSONResponse(metrics)

# -------------------------------------------------------
# Prediction API
# -------------------------------------------------------

@app.post("/predict")
async def predict_eeg(

    file: UploadFile = File(...),

    model_name: str = Form("Random Forest")

):

    filepath = os.path.join(

        UPLOAD_FOLDER,

        file.filename

    )

    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(

            file.file,

            buffer

        )

    result = predict(

        filepath,

        model_name

    )

    return result