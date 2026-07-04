import {
  Mail,
  Brain,
  Phone,
  School,
  Cpu,
  BookOpen,
} from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-100 py-16">

      <div className="max-w-6xl mx-auto px-8">

        {/* Header */}

        <div className="text-center mb-16">

          <Brain
            className="mx-auto text-blue-600"
            size={70}
          />

          <h1 className="text-5xl font-black mt-5">
            Contact & Project Information
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            NeuroScan AI – AI Powered Alzheimer's Disease Detection using EEG Signals
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Email */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

            <Mail
              className="text-blue-600 mb-5"
              size={45}
            />

            <h2 className="text-2xl font-bold mb-3">
              Email
            </h2>

            <p className="text-gray-600">
              neuroscanai@gmail.com
            </p>

          </div>

          {/* Project */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

            <BookOpen
              className="text-green-600 mb-5"
              size={45}
            />

            <h2 className="text-2xl font-bold mb-3">
              Project
            </h2>

            <p className="text-gray-600">
              Final Year B.Tech Project
            </p>

          </div>

          {/* Institution */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

            <School
              className="text-purple-600 mb-5"
              size={45}
            />

            <h2 className="text-2xl font-bold mb-3">
              Institution
            </h2>

            <p className="text-gray-600">
              VIT-AP, UNIVERSITY
            </p>

          </div>

          {/* Technologies */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

            <Cpu
              className="text-red-600 mb-5"
              size={45}
            />

            <h2 className="text-2xl font-bold mb-3">
              Technologies
            </h2>

            <p className="text-gray-600 leading-8">
              React<br />
              TypeScript<br />
              FastAPI<br />
              TensorFlow<br />
              Scikit-Learn<br />
              MNE Python
            </p>

          </div>

          {/* Phone */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

            <Phone
              className="text-orange-600 mb-5"
              size={45}
            />

            <h2 className="text-2xl font-bold mb-3">
              Contact
            </h2>

            <p className="text-gray-600">
              +91 9730225137
            </p>

          </div>

          {/* AI */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

            <Brain
              className="text-blue-600 mb-5"
              size={45}
            />

            <h2 className="text-2xl font-bold mb-3">
              NeuroScan AI
            </h2>

            <p className="text-gray-600 leading-8">
              AI-powered Alzheimer's Disease Detection using EEG signals,
              Machine Learning and Deep Learning.
            </p>

          </div>

        </div>

        {/* Bottom Banner */}

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white p-10 text-center shadow-xl">

          <h2 className="text-4xl font-bold">
            Thank You for Visiting NeuroScan AI
          </h2>

          <p className="mt-5 text-lg text-blue-100 leading-8">
            NeuroScan AI demonstrates the integration of Artificial Intelligence,
            EEG Signal Processing and Machine Learning for early Alzheimer's
            Disease detection. This project has been developed for educational
            and research purposes.
          </p>

        </div>

      </div>

    </div>
  );
}