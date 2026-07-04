import { useState } from "react";
import { uploadEEG } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Brain } from "lucide-react";
import LoadingModal from "../components/LoadingModal";

export default function Detection() {
  const [file, setFile] = useState<File | null>(null);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    id: "",
  });

  const [model, setModel] = useState("Random Forest");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const analyzeEEG = async () => {
    if (!file) {
      alert("Please select an EEG (.set) file.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadEEG(file, model);

      navigate("/results", {
        state: {
          ...result,
          patient,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-12">
        <div className="text-center mb-10">
          <Brain className="mx-auto text-blue-600" size={60} />

          <h1 className="text-5xl font-bold mt-4">
            EEG Detection Portal
          </h1>

          <p className="text-gray-500 mt-3">
            Upload an EEG (.set) file to analyze Alzheimer's Disease.
          </p>
        </div>

        {/* Patient Information */}

        <h2 className="text-2xl font-semibold mb-6">
          Patient Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Patient Name"
            className="border rounded-xl p-4"
            value={patient.name}
            onChange={(e) =>
              setPatient({ ...patient, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Age"
            className="border rounded-xl p-4"
            value={patient.age}
            onChange={(e) =>
              setPatient({ ...patient, age: e.target.value })
            }
          />

          <select
            className="border rounded-xl p-4"
            value={patient.gender}
            onChange={(e) =>
              setPatient({ ...patient, gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Patient ID"
            className="border rounded-xl p-4"
            value={patient.id}
            onChange={(e) =>
              setPatient({ ...patient, id: e.target.value })
            }
          />
        </div>

        {/* Model Selection */}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">
            Select AI Model
          </h2>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border rounded-xl p-4 w-full"
          >
            <option>Decision Tree</option>
            <option>Random Forest</option>
            <option>SVM</option>
            <option>KNN</option>
            <option>Logistic Regression</option>
          </select>
        </div>

        {/* Upload */}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            Upload EEG File
          </h2>

          <label className="border-2 border-dashed rounded-2xl h-72 flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50 transition">
            <Upload
              className="text-blue-600 mb-4"
              size={70}
            />

            <p className="text-xl font-semibold">
              Drag & Drop EEG File
            </p>

            <p className="text-gray-500">
              or Click to Browse
            </p>

            <input
              type="file"
              accept=".set"
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>

          {file && (
            <div className="mt-6 flex items-center gap-3 bg-green-50 p-4 rounded-xl">
              <FileText className="text-green-600" />
              <span>{file.name}</span>
            </div>
          )}
        </div>

        <button
          onClick={analyzeEEG}
          disabled={loading}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl text-xl font-bold"
        >
          {loading ? "Analyzing..." : "Analyze EEG"}
        </button>
      </div>
      <LoadingModal
        open={loading}
        model={model}
      />
    
    </div>
  );
}