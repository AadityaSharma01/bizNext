import { useEffect, useState, useRef } from "react";
import DataForChart from "./ChartCard"; // your API call
import { Navbar } from "./navbar";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartComponent = () => {
    const [aiRes, setAiRes] = useState(""); // default to empty string
    const [chartData, setChartData] = useState(null);
    const [chartKey, setChartKey] = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fillData = async () => {
            try {
                const data = await DataForChart();
                if (!data || !canvasRef.current) return;

                setChartData({
                    labels: data.labels,
                    datasets: data.datasets,
                });

                setAiRes(data.aires?.trim?.() || ""); // safe default
                setChartKey(prev => prev + 1);
            } catch (error) {
                console.error("Failed to load chart data:", error);
            }
        };

        fillData();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ width: "100%", height: "300px" }}>
                <canvas ref={canvasRef} style={{ display: "none" }} />
                {chartData ? (
                    <Bar data={chartData} key={chartKey} />
                ) : (
                    <div>Loading chart...</div>
                )}
            </div>

            {aiRes && (
                <div style={{backgroundColor: "gray"}} dangerouslySetInnerHTML={{ __html: aiRes }} />
            )}
        </>
    );
};

export default ChartComponent;
