import {
  Brain,
  Activity,
  ShieldCheck,
  Cpu,
  Database,
  BarChart3,
  Zap,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "EEG Signal Analysis",
    desc: "Analyzes 19-channel EEG recordings using advanced preprocessing and feature extraction.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Cpu,
    title: "Multiple AI Models",
    desc: "Decision Tree, Random Forest, SVM, KNN and Logistic Regression are evaluated.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Database,
    title: "OpenNeuro Dataset",
    desc: "Built using the public OpenNeuro Alzheimer's EEG dataset for reproducible research.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "Fast Prediction",
    desc: "Predicts Alzheimer's disease from EEG recordings within seconds.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: BarChart3,
    title: "Model Comparison",
    desc: "Compare performance of different machine learning models on the same dataset.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Pipeline",
    desc: "Uses signal preprocessing, deep feature extraction and machine learning classification.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    desc: "Generate professional EEG analysis reports instantly after prediction.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Activity,
    title: "Research Driven",
    desc: "Developed as an AI-assisted clinical decision support system for early Alzheimer's detection.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black text-slate-900">
            Why Choose NeuroScan AI?
          </h2>

          <p className="mt-5 text-xl text-slate-600 max-w-3xl mx-auto">
            NeuroScan AI combines EEG signal processing,
            deep learning and machine learning into one
            intelligent platform for early Alzheimer's
            disease detection.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8"
            >

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bg}`}
              >

                <feature.icon
                  size={34}
                  className={feature.color}
                />

              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                {feature.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}