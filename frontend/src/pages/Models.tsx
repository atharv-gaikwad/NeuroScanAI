import ModelChart from "../components/ModelChart";
import ConfusionMatrices from "../components/ConfusionMatrices";
import { useEffect, useState } from "react";

import {
  Brain,
  Trophy,
  Cpu,
  Activity,
  CheckCircle,
} from "lucide-react";

import { getMetrics } from "../services/api";

interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

export default function Models() {

  const [metrics, setMetrics] = useState<
    Record<string, ModelMetrics>
  >({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadMetrics() {

      try {

        const data = await getMetrics();

        setMetrics(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadMetrics();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <div className="text-center">

          <Brain
            size={70}
            className="mx-auto text-blue-600 animate-pulse"
          />

          <h1 className="text-3xl font-bold mt-6">

            Loading AI Models...

          </h1>

        </div>

      </div>

    );

  }

  const modelEntries = Object.entries(metrics);

  const bestModel = modelEntries.reduce(

    (best, current) =>

      current[1].accuracy > best[1].accuracy

        ? current

        : best

  );

  const bestAccuracy = (
    bestModel[1].accuracy * 100
  ).toFixed(2);

    return (
    <div className="min-h-screen bg-slate-100 py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-14">

          <Brain
            size={70}
            className="mx-auto text-blue-600"
          />

          <h1 className="text-5xl font-black mt-6">

            AI Model Dashboard

          </h1>

          <p className="text-gray-600 mt-4 text-lg">

            Performance comparison of every machine learning model
            trained in NeuroScan AI.

          </p>

        </div>

        {/* Best Model */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl text-white p-10 mb-12">

          <div className="flex flex-col md:flex-row items-center justify-between">

            <div className="flex items-center gap-5">

              <Trophy
                size={70}
                className="text-yellow-300"
              />

              <div>

                <h2 className="text-4xl font-black">

                  Best Performing Model

                </h2>

                <p className="text-blue-100 mt-2 text-lg">

                  Automatically selected using evaluation metrics

                </p>

              </div>

            </div>

            <div className="mt-8 md:mt-0 text-center">

              <h1 className="text-4xl font-black">

                {bestModel[0]}

              </h1>

              <p className="text-2xl mt-3 font-bold">

                {bestAccuracy}%

              </p>

            </div>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

            <Cpu
              className="mx-auto text-blue-600 mb-4"
              size={45}
            />

            <h2 className="text-3xl font-black">

              {modelEntries.length}

            </h2>

            <p className="text-gray-600 mt-2">

              Models Trained

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

            <Brain
              className="mx-auto text-green-600 mb-4"
              size={45}
            />

            <h2 className="text-3xl font-black">

              65

            </h2>

            <p className="text-gray-600 mt-2">

              Patients

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

            <Activity
              className="mx-auto text-purple-600 mb-4"
              size={45}
            />

            <h2 className="text-3xl font-black">

              19

            </h2>

            <p className="text-gray-600 mt-2">

              EEG Channels

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

            <CheckCircle
              className="mx-auto text-orange-600 mb-4"
              size={45}
            />

            <h2 className="text-3xl font-black">

              No

            </h2>

            <p className="text-gray-600 mt-2">

              Data Leakage

            </p>

          </div>

        </div>

                {/* Model Performance */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-black mb-10 flex items-center gap-3">

            <Cpu className="text-blue-600" />

            Model Comparison

          </h2>

          <div className="space-y-8">

            {modelEntries.map(([name, data]) => {

              const accuracy = (data.accuracy * 100).toFixed(2);

              const precision = (data.precision * 100).toFixed(2);

              const recall = (data.recall * 100).toFixed(2);

              const f1 = (data.f1_score * 100).toFixed(2);

              const isBest = name === bestModel[0];

              return (

                <div
                  key={name}
                  className={`rounded-3xl border-2 p-8 transition ${
                    isBest
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-slate-200"
                  }`}
                >

                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">

                    <div>

                      <h3 className="text-3xl font-black">

                        {name}

                      </h3>

                      {isBest && (

                        <span className="inline-block mt-3 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold">

                          🏆 Recommended Model

                        </span>

                      )}

                    </div>

                    <div className="text-center mt-6 md:mt-0">

                      <p className="text-sm text-gray-500">

                        Accuracy

                      </p>

                      <h2 className="text-5xl font-black text-blue-600">

                        {accuracy}%

                      </h2>

                    </div>

                  </div>

                  {/* Accuracy */}

                  <div className="mb-7">

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">

                        Accuracy

                      </span>

                      <span className="font-bold">

                        {accuracy}%

                      </span>

                    </div>

                    <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">

                      <div
                        className={`h-full ${
                          isBest
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }`}
                        style={{
                          width: `${accuracy}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Metrics */}

                  <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-slate-100 rounded-2xl p-5 text-center">

                      <h4 className="font-bold text-lg">

                        Precision

                      </h4>

                      <p className="text-3xl font-black mt-2 text-purple-600">

                        {precision}%

                      </p>

                    </div>

                    <div className="bg-slate-100 rounded-2xl p-5 text-center">

                      <h4 className="font-bold text-lg">

                        Recall

                      </h4>

                      <p className="text-3xl font-black mt-2 text-green-600">

                        {recall}%

                      </p>

                    </div>

                    <div className="bg-slate-100 rounded-2xl p-5 text-center">

                      <h4 className="font-bold text-lg">

                        F1 Score

                      </h4>

                      <p className="text-3xl font-black mt-2 text-orange-600">

                        {f1}%

                      </p>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

        <ModelChart metrics={metrics} />
        <ConfusionMatrices />

                {/* Evaluation Summary */}

        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <Activity
              className="text-green-600"
              size={35}
            />

            <h2 className="text-3xl font-black">

              Evaluation Summary

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <h3 className="text-2xl font-bold mb-4">

                Project Highlights

              </h3>

              <ul className="space-y-3 text-gray-700">

                <li>✅ Patient-level train/test split</li>

                <li>✅ Supervised Autoencoder feature extraction</li>

                <li>✅ 19 EEG channel analysis</li>

                <li>✅ Multiple Machine Learning models</li>

                <li>✅ Real-time prediction through FastAPI</li>

                <li>✅ No data leakage</li>

              </ul>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-4">

                Machine Learning Pipeline

              </h3>

              <div className="bg-slate-100 rounded-2xl p-6">

                <p className="leading-8 text-gray-700">

                  EEG (.set) File

                  <br />

                  ↓

                  <br />

                  Signal Preprocessing

                  <br />

                  ↓

                  <br />

                  Supervised Autoencoder

                  <br />

                  ↓

                  <br />

                  Latent Feature Extraction

                  <br />

                  ↓

                  <br />

                  Machine Learning Classifier

                  <br />

                  ↓

                  <br />

                  Alzheimer's Prediction

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-12 text-center text-gray-500">

          <p className="text-lg">

            NeuroScan AI • Alzheimer's Disease Detection using EEG Signals

          </p>

          <p className="mt-2">

            Final Year Project • React • FastAPI • TensorFlow • Scikit-learn

          </p>

        </div>

      </div>

    </div>

  );

}