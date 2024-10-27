import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
);

const Leetcode = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [fetchData, setFetchData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchData) {
      const fetchDataFromAPI = async () => {
        try {
          const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
        } finally {
          setFetchData(false);
        }
      };

      fetchDataFromAPI();
    }
  }, [fetchData, username]);

  const handleData = (e) => {
    e.preventDefault();
    setFetchData(true);
  };

  // Data for Bar Chart (Problem Difficulty Distribution)
  const barData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Problems Solved',
        data: [data.easySolved || 0, data.mediumSolved || 0, data.hardSolved || 0],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  // Data for Line Chart (Submission Trend)
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Submissions Over Time',
        data: [12, 19, 15, 25, 20, 30, 35, 40, 28, data.solvedProblem || 0],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  // Data for Pie Chart (Proportion of Problems Solved)
  const pieData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Problem Proportions',
        data: [data.easySolved || 0, data.mediumSolved || 0, data.hardSolved || 0],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  // Data for Radar Chart (Comparison of Submissions and Solved Problems)
  const radarData = {
    labels: ['Total Submissions', 'Easy Solved', 'Medium Solved', 'Hard Solved'],
    datasets: [
      {
        label: 'Efficiency Comparison',
        data: [data.solvedProblem || 0, data.easySolved || 0, data.mediumSolved || 0, data.hardSolved || 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-4 bg-gray-700 placeholder-white text-white"
          placeholder="Enter Leetcode username"
        />
        <button
          onClick={handleData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Get Data
        </button>

        <nav className="flex flex-col gap-4">
          <a href="#profile" className="hover:text-blue-300">Profile</a>
          <a href="#submissions" className="hover:text-blue-300">Submissions</a>
          <a href="#stats" className="hover:text-blue-300">Statistics</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Leetcode User Data</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Submissions</h3>
            <p className="text-2xl">{data.solvedProblem || 0}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Easy Problems Solved</h3>
            <p className="text-2xl">{data.easySolved || 0}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Medium Problems Solved</h3>
            <p className="text-2xl">{data.mediumSolved || 0}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Hard Problems Solved</h3>
            <p className="text-2xl">{data.hardSolved || 0}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Statistics & Graphs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Problems Solved by Difficulty</h3>
              <Bar data={barData} />
            </div>

            {/* Line Chart */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Submission Trend Over Time</h3>
              <Line data={lineData} />
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Proportion of Problems Solved</h3>
              <Pie data={pieData} />
            </div>

            {/* Radar Chart */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Comparison of Problem Solving Efficiency</h3>
              <Radar data={radarData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leetcode;