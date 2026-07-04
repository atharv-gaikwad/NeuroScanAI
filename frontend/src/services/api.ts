const API = "http://127.0.0.1:8000";

export async function uploadEEG(
    file: File,
    model: string
) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("model_name", model);

    const response = await fetch(`${API}/predict`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Prediction failed");
    }

    return response.json();
}

// =======================================
// Load Model Metrics
// =======================================

export async function getMetrics() {

    const response = await fetch(`${API}/metrics`);

    if (!response.ok) {
        throw new Error("Unable to load metrics");
    }

    return response.json();
}