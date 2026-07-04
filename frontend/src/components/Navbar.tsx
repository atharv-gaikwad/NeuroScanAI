import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Detection", path: "/detect" },
    { name: "Models", path: "/models" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Brain
            className="text-blue-600"
            size={36}
          />

          <h1 className="text-3xl font-black text-blue-600">
            NeuroScan AI
          </h1>
        </Link>

        <div className="flex items-center gap-8">

          {navItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>

          ))}

        </div>

      </div>
    </nav>
  );
}