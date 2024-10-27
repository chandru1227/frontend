import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


const Overview = () => {
    const [tweet, setTweet] = useState(null);
    const[arr,setarr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTweet = async () => {
        try {
            const response = await axios.get('https://x66.p.rapidapi.com/tweet/1668868113725550592/', {
                headers: {
                    'x-rapidapi-host': 'x66.p.rapidapi.com',
                    'x-rapidapi-key': '74a092928bmsh3aca3465f4c4454p12585cjsn516c07c52e6a', 
                    'Content-Type': 'application/json'
                }
            });
            setTweet(response.data.threaded_conversation_with_injections[0].entries[0].content.itemContent.tweet_results.result);
        } catch (error) {
            setError('Error fetching tweet: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchTweet();
    }, []);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    const user = tweet.core.user_results.result.legacy;

    console.log(arr)
    
    // Data for the charts
    const barData = {
        labels: ['Oct 2019', 'Nov 2019', 'Dec 2019', 'Jan 2020', 'Feb 2020', 'Mar 2020'],
        datasets: [
            {
                label: 'Male',
                backgroundColor: '#7e3af2',
                data: [1500, 3000, 2500, 2700, 4000, 4500],
            },
            {
                label: 'Female',
                backgroundColor: '#10b981',
                data: [1000, 1500, 1200, 1400, 2000, 2300],
            },
        ],
    };

    const doughnutData = {
        labels: ['Female', 'Male'],
        datasets: [
            {
                data: [3000, 2400],
                backgroundColor: ['#6b46c1', '#f6ad55'],
                hoverBackgroundColor: ['#805ad5', '#fbd38d'],
            },
        ],
    };

    const lineData = {
        labels: ['07 am', '08 am', '09 am', '10 am', '11 am', '12 pm'],
        datasets: [
            {
                label: 'likes',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                data: [113, 150, 170, 190, 135, 160],
            },
        ],
    };

    const areaData = {
        labels: ['14', '15', '16', '17', '18', '19'],
        datasets: [
            {
                label: 'Followers this month',
                data: [232, 214, 190, 220, 240, 232],
                fill: true,
                backgroundColor: 'rgba(126, 58, 242, 0.3)',
                borderColor: 'rgba(126, 58, 242, 1)',
            },
        ],
    };

    return (
        <div className="flex flex-col h-screen bg-gray-light">
            <div className="flex flex-1">
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-semibold text-gray-dark">{user.name}</h2>
                        {/* <input type="text" placeholder="Search" className="border rounded-lg p-2 w-1/4" /> */}
                    </div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-dark">Total Followers</p>
                            <h3 className="text-3xl font-bold text-primary">{tweet.core.user_results.result.legacy.followers_count}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-dark">Total Friends</p>
                            <h3 className="text-3xl font-bold text-primary">{tweet.core.user_results.result.legacy.friends_count}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-dark">Total Views</p>
                            <h3 className="text-3xl font-bold text-secondary">{tweet.views.count}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-dark">Likes</p>
                            <h3 className="text-3xl font-bold text-secondary">38837592</h3>
                        </div>
                    </div>
                    {/* Charts Section */}
                    <section className="mt-8 grid grid-cols-3 gap-6">
                        {/* Bar Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-dark">Male vs. Female Followers</h3>
                            <Bar data={barData} />
                        </div>
                        {/* Doughnut Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-dark">Followers by Gender</h3>
                            <Doughnut data={doughnutData} />
                        </div>
                        {/* Line Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-dark">Likes</h3>
                            <Line data={lineData} />
                        </div>
                        {/* Area Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
                            <h3 className="text-lg font-semibold text-gray-dark">Monthly Followers Count</h3>
                            <Line data={areaData} />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};
export default Overview;