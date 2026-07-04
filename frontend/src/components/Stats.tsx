import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import {
  Brain,
  Activity,
  Database,
  Cpu,
} from "lucide-react";

const stats = [
  {
    icon: Brain,
    number: 65,
    suffix: "",
    title: "Participants",
    color: "text-blue-600",
  },
  {
    icon: Activity,
    number: 19,
    suffix: "",
    title: "EEG Channels",
    color: "text-green-600",
  },
  {
    icon: Database,
    number: 500,
    suffix: " Hz",
    title: "Sampling Rate",
    color: "text-purple-600",
  },
  {
    icon: Cpu,
    number: 84.62,
    suffix: "%",
    title: "Best Accuracy",
    color: "text-orange-600",
  },
];

export default function Stats() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (

    <section
      ref={ref}
      className="bg-slate-100 py-24"
    >

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-black text-center mb-14">

          Dataset & AI Statistics

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-3xl p-10 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 text-center"
            >

              <item.icon
                size={55}
                className={`mx-auto mb-6 ${item.color}`}
              />

              <h1 className="text-5xl font-black">
                  {item.number}
                  {item.suffix}
              </h1>

              <p className="mt-4 text-slate-600 text-lg">

                {item.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}