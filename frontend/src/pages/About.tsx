import {
  Brain,
  Database,
  Cpu,
  Activity,
  ShieldCheck,
  Microscope,
  ArrowRight,
} from "lucide-react";

const technologies = [
  "React + TypeScript",
  "FastAPI",
  "TensorFlow / Keras",
  "Scikit-learn",
  "MNE-Python",
  "NumPy & SciPy",
];

const pipeline = [
  "EEG Signal Acquisition",
  "Signal Preprocessing",
  "Supervised Autoencoder",
  "Latent Feature Extraction",
  "Machine Learning Classification",
  "Clinical Prediction",
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <Brain
            size={70}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-black">

            About NeuroScan AI

          </h1>

          <p className="mt-6 max-w-4xl mx-auto text-xl text-blue-100 leading-9">

            NeuroScan AI is an AI-assisted healthcare platform developed
            for the early detection of Alzheimer's Disease using
            Electroencephalography (EEG) signals and Machine Learning.

          </p>

        </div>

      </section>

      {/* Mission */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <Microscope
              size={50}
              className="text-blue-600 mb-6"
            />

            <h2 className="text-3xl font-black mb-5">

              Project Objective

            </h2>

            <p className="text-slate-600 leading-8">

              The objective of NeuroScan AI is to assist clinicians by
              automatically analysing EEG recordings and predicting
              Alzheimer's Disease using multiple machine learning
              algorithms trained on patient-level data.

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <ShieldCheck
              size={50}
              className="text-green-600 mb-6"
            />

            <h2 className="text-3xl font-black mb-5">

              Research Integrity

            </h2>

            <p className="text-slate-600 leading-8">

              The system was redesigned using patient-level train/test
              splitting to eliminate data leakage, ensuring a more
              reliable evaluation of model performance.

            </p>

          </div>

        </div>

      </section>

      {/* Pipeline */}

      <section className="py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-black text-center mb-14">

            AI Processing Pipeline

          </h2>

          <div className="grid lg:grid-cols-6 gap-5">

            {pipeline.map((step) => (

              <div
                key={step}
                className="bg-white rounded-3xl shadow-lg p-6 text-center"
              >

                <Activity
                  className="mx-auto text-blue-600 mb-4"
                  size={40}
                />

                <h3 className="font-bold">

                  {step}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Dataset */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <Database
              size={50}
              className="text-purple-600 mb-6"
            />

            <h2 className="text-3xl font-black mb-6">

              Dataset

            </h2>

            <ul className="space-y-4 text-slate-600">

              <li>• OpenNeuro EEG Dataset</li>

              <li>• 65 Participants</li>

              <li>• 19 EEG Channels</li>

              <li>• 500 Hz Sampling Rate</li>

              <li>• Eyes Closed Recordings</li>

            </ul>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <Cpu
              size={50}
              className="text-orange-600 mb-6"
            />

            <h2 className="text-3xl font-black mb-6">

              Technology Stack

            </h2>

            <div className="grid grid-cols-2 gap-4">

              {technologies.map((tech) => (

                <div
                  key={tech}
                  className="bg-slate-100 rounded-xl p-4 text-center font-semibold"
                >

                  {tech}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Future */}

      <section className="pb-20">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white p-12">

            <h2 className="text-4xl font-black mb-8">

              Future Scope

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex gap-3">

                <ArrowRight />

                Real-time EEG streaming

              </div>

              <div className="flex gap-3">

                <ArrowRight />

                Deep Learning Models

              </div>

              <div className="flex gap-3">

                <ArrowRight />

                Cloud Deployment

              </div>

              <div className="flex gap-3">

                <ArrowRight />

                Hospital Integration

              </div>

              <div className="flex gap-3">

                <ArrowRight />

                Multi-disease Detection

              </div>

              <div className="flex gap-3">

                <ArrowRight />

                Mobile Healthcare Platform

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}