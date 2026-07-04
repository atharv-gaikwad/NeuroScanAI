import { motion } from "framer-motion";
import {
  Brain,
  Activity,
  Cpu,
  Database,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-[92vh] bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center">

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

            <Activity size={18} />

            AI Healthcare Platform

          </div>

          <h1 className="text-6xl lg:text-7xl font-black mt-8 leading-tight text-slate-900">

            Early
            <span className="text-blue-600">
              {" "}Alzheimer's
            </span>

            <br />

            Detection using

            <span className="text-blue-600">
              {" "}EEG
            </span>

          </h1>

          <p className="mt-8 text-xl leading-9 text-slate-600">

            NeuroScan AI is an intelligent Alzheimer's
            detection platform that combines
            EEG Signal Processing,
            Deep Learning Autoencoders,
            and Machine Learning models
            to assist clinicians in early diagnosis.

          </p>
            <div className="mt-8 flex flex-wrap gap-3">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ Patient-Level Training
              </span>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ No Data Leakage
              </span>

              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ Autoencoder Features
              </span>

            </div>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/detect"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold transition shadow-lg"
            >
              🧠 Start AI Detection
            </Link>

            <Link
              to="/models"
              className="px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg font-bold transition"
            >
              📊 View AI Models
            </Link>

          </div>

          {/* Badges */}

          <div className="grid grid-cols-2 gap-4 mt-12">

            <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-3 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

              <Database
                className="text-blue-600"
              />

              <div>

                <h3 className="font-bold">
                  OpenNeuro
                </h3>

                <p className="text-gray-500 text-sm">
                  EEG Dataset
                </p>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-3 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

              <Cpu
                className="text-green-600"
              />

              <div>

                <h3 className="font-bold">
                  5 AI Models
                </h3>

                <p className="text-gray-500 text-sm">
                  ML Comparison
                </p>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-3 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

              <Brain
                className="text-purple-600"
              />

              <div>

                <h3 className="font-bold">
                  Autoencoder
                </h3>

                <p className="text-gray-500 text-sm">
                  Deep Learning
                </p>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-3 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

              <ShieldCheck
                className="text-red-600"
              />

              <div>

                <h3 className="font-bold">
                  Research
                </h3>

                <p className="text-gray-500 text-sm">
                  AI Assisted
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >

          <div className="relative w-[520px] h-[520px] flex items-center justify-center">
            {/* Outer Ring */}

            <div className="absolute w-[430px] h-[430px] rounded-full border-2 border-blue-200 animate-spin"
              style={{
                animationDuration: "25s",
              }}
            />

            {/* Middle Ring */}

            <div className="absolute w-[340px] h-[340px] rounded-full border border-blue-300 animate-spin"
              style={{
                animationDuration: "18s",
                animationDirection: "reverse",
              }}
            />

            {/* Inner Glow */}

            <div className="absolute w-[240px] h-[240px] rounded-full bg-blue-100 blur-3xl opacity-60" />

            {/* Brain */}

            <div className="relative z-10 bg-white rounded-full p-12 shadow-2xl">

              <Brain
                size={170}
                className="text-blue-600 animate-pulse"
              />

            </div>

            {/* Floating Dots */}

            <div className="absolute top-6 left-28 w-4 h-4 rounded-full bg-blue-500 animate-bounce" />

            <div className="absolute bottom-10 right-20 w-3 h-3 rounded-full bg-indigo-500 animate-ping" />

            <div className="absolute top-32 right-2 w-5 h-5 rounded-full bg-cyan-400 animate-bounce"
              style={{
                animationDelay: "1s",
              }}
            />

            <div className="absolute bottom-24 left-6 w-3 h-3 rounded-full bg-sky-400 animate-ping"
              style={{
                animationDelay: ".8s",
              }}
            />
            {/* Floating Accuracy Card */}

            <div className="absolute top-14 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4">

              <h3 className="text-3xl font-black text-blue-600">
                84.62%
              </h3>

              <p className="text-gray-500 text-sm">
                Best Accuracy
              </p>

            </div>

            {/* Floating EEG Card */}

            <div className="absolute bottom-10 left-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4">

              <h3 className="text-3xl font-black text-green-600">
                19
              </h3>

              <p className="text-gray-500 text-sm">
                EEG Channels
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}