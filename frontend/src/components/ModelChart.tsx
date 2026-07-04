import { useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";

type Metric = {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
};

type Props = {
    metrics: Record<string, Metric>;
};

const colors = [
    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#ea580c",
    "#dc2626",
];

export default function ModelChart({ metrics }: Props) {

    const [metric, setMetric] =
        useState<keyof Metric>("accuracy");

    const labels = {
        accuracy: "Accuracy",
        precision: "Precision",
        recall: "Recall",
        f1_score: "F1 Score",
    };

    const data = Object.entries(metrics).map(
        ([name, value]) => ({
            name,
            value: Number(
                (value[metric] * 100).toFixed(2)
            ),
        })
    );

    return (

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-black">

                    Model Comparison

                </h2>

                <select
                    value={metric}
                    onChange={(e) =>
                        setMetric(
                            e.target.value as keyof Metric
                        )
                    }
                    className="border rounded-xl p-3"
                >

                    <option value="accuracy">
                        Accuracy
                    </option>

                    <option value="precision">
                        Precision
                    </option>

                    <option value="recall">
                        Recall
                    </option>

                    <option value="f1_score">
                        F1 Score
                    </option>

                </select>

            </div>

            <ResponsiveContainer
                width="100%"
                height={420}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis domain={[0,100]} />

                    <Tooltip />

                    <Bar dataKey="value">

                        {data.map((_, index) => (

                            <Cell
                                key={index}
                                fill={colors[index]}
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

            <p className="text-center mt-6 text-gray-500">

                Showing {labels[metric]} for every trained model.

            </p>

        </div>

    );

}