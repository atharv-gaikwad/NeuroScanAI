import { Brain } from "lucide-react";

interface LoadingModalProps {
  open: boolean;
  model: string;
}

export default function LoadingModal({
  open,
  model,
}: LoadingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[550px]">

        <Brain
          size={70}
          className="mx-auto text-blue-600 animate-pulse"
        />

        <h1 className="text-4xl font-black text-center mt-6">

          NeuroScan AI

        </h1>

        <p className="text-center text-gray-500 mt-3">

          AI is analyzing the EEG recording...

        </p>

        <div className="mt-10 space-y-7">

          <LoadingStep
            text="Reading EEG Recording"
            delay="0s"
          />

          <LoadingStep
            text="Extracting EEG Features"
            delay=".3s"
          />

          <LoadingStep
            text={`Running ${model}`}
            delay=".6s"
          />

          <LoadingStep
            text="Calculating Confidence"
            delay=".9s"
          />

          <LoadingStep
            text="Generating Medical Report"
            delay="1.2s"
          />

        </div>

      </div>

    </div>
  );
}

function LoadingStep({
  text,
  delay,
}: {
  text: string;
  delay: string;
}) {
  return (
    <div
      className="animate-pulse"
      style={{
        animationDelay: delay,
      }}
    >
      <div className="flex justify-between mb-2">

        <span className="font-semibold">

          {text}

        </span>

        <span className="text-blue-600">

          ...

        </span>

      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

        <div className="h-full bg-blue-600 rounded-full animate-[loading_2s_linear_infinite]" />

      </div>

    </div>
  );
}