/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Product Charts",
    },
  },
};

const labels = ["January", "February"];

interface Props {
  data: any[];
}

const Barchart = (props: Props) => {
  const chartData = {
    labels,
    datasets: (props?.data?.payload as any) || [],
  };

  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <Bar options={options} data={chartData} className="w-full" />
    </div>
  );
};

export default Barchart;
