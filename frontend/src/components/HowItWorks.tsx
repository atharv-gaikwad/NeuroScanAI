import {
  Upload,
  Cpu,
  Brain,
  FileText,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload EEG",
    desc: "Upload a 19-channel EEG (.set) recording.",
  },
  {
    icon: Cpu,
    title: "Feature Extraction",
    desc: "The supervised autoencoder extracts latent EEG features.",
  },
  {
    icon: Brain,
    title: "AI Prediction",
    desc: "Decision Tree, Random Forest and other models classify the patient.",
  },
  {
    icon: FileText,
    title: "Medical Report",
    desc: "Receive prediction, confidence score and patient summary.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-black text-center mb-4">
          How NeuroScan AI Works
        </h2>

        <p className="text-center text-slate-500 mb-16">
          From EEG recording to AI-assisted prediction in four simple steps.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step) => (

            <div
              key={step.title}
              className="bg-slate-50 rounded-3xl p-8 shadow hover:shadow-xl transition"
            >

              <step.icon
                size={50}
                className="text-blue-600 mb-6"
              />

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {step.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}