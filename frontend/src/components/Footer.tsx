import { Link } from "react-router-dom";
import {
  Brain,
  Mail,
  Database,
  Cpu,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">

        {/* Brand */}

        <div>

          <div className="flex items-center gap-3 mb-5">

            <Brain
              size={40}
              className="text-blue-400"
            />

            <h2 className="text-3xl font-black">

              NeuroScan AI

            </h2>

          </div>

          <p className="text-slate-400 leading-8">

            AI-powered early Alzheimer's Disease detection
            using EEG signals, Machine Learning and
            Deep Learning.

          </p>

        </div>

        {/* Navigation */}

        <div>

          <h3 className="text-xl font-bold mb-5">

            Quick Links

          </h3>

          <ul className="space-y-3">

            <li>
              <Link
                to="/"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/detect"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Detection
              </Link>
            </li>

            <li>
              <Link
                to="/models"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Models
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Contact
              </Link>
            </li>

          </ul>

        </div>

        {/* Technology */}

        <div>

          <h3 className="text-xl font-bold mb-5">

            Technology

          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">

              <Cpu className="text-blue-400" />

              <span>React + TypeScript</span>

            </div>

            <div className="flex gap-3">

              <Cpu className="text-blue-400" />

              <span>FastAPI</span>

            </div>

            <div className="flex gap-3">

              <Database className="text-green-400" />

              <span>TensorFlow</span>

            </div>

            <div className="flex gap-3">

              <Database className="text-green-400" />

              <span>Scikit-learn</span>

            </div>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-bold mb-5">

            Contact

          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">

              <Mail className="text-red-400" />

              <span>neuroscanai@gmail.com</span>

            </div>

            <div className="flex items-center gap-3">

              <FaGithub className="text-white text-xl" />

              <span>GitHub Repository</span>

            </div>

            <div className="flex items-center gap-3">

              <FaLinkedin className="text-blue-500 text-xl" />

              <span>LinkedIn</span>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-6">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-slate-400">

            © 2026 NeuroScan AI. All Rights Reserved.

          </p>

          <p className="text-slate-500 mt-3 md:mt-0">

            Final Year Project • React • FastAPI • TensorFlow

          </p>

        </div>

      </div>

    </footer>
  );
}