import React from 'react';
import Plot from 'react-plotly.js';

const AnalyticsDashboard = ({ videoDetails }) => {
  // Sort videos by views and get the top 10
  const topVideos = videoDetails
    .map(video => ({
      title: video.Title,
      views: video.Views,
      likes: video.Likes,
      dislikes: video.Dislikes || 0,
      comments: video.Comments,
      engagementRate: ((video.Likes + video.Comments) / video.Views) * 100 || 0,
    }))
    .sort((a, b) => b.views - a.views) // Sort by views in descending order
    .slice(0, 10); // Get top 10 videos

  const titles = topVideos.map(data => data.title);
  const views = topVideos.map(data => data.views);
  const likes = topVideos.map(data => data.likes);
  const engagementRates = topVideos.map(data => data.engagementRate);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">YouTube Analytics Dashboard</h2>

      <Plot
        data={[
          {
            x: titles,
            y: views,
            type: 'bar',
            name: 'Views',
            marker: { color: 'blue' },
          },
          {
            x: titles,
            y: likes,
            type: 'bar',
            name: 'Likes',
            marker: { color: 'green' },
          },
        ]}
        layout={{
          title: 'Top 10 Videos: Views and Likes',
          xaxis: {
            title: 'Video Titles',
            tickangle: -45,
            automargin: true,
          },
          yaxis: { title: 'Count', rangemode: 'tozero' },
          barmode: 'group',
          width: window.innerWidth * 0.9,
          height: window.innerHeight * 0.4,
          margin: { t: 50, r: 50, b: 100, l: 70 },
          plot_bgcolor: '#f9f9f9',
        }}
      />

      <Plot
        data={[
          {
            x: titles,
            y: engagementRates,
            type: 'scatter',
            mode: 'lines+markers+text',
            name: 'Engagement Rate (%)',
            marker: { color: 'red' },
            text: engagementRates.map(rate => rate.toFixed(2)),
            textposition: 'top center',
          },
        ]}
        layout={{
          title: 'Engagement Rate for Top 10 Videos',
          xaxis: {
            title: 'Video Titles',
            tickangle: -45,
            automargin: true,
          },
          yaxis: { title: 'Engagement Rate (%)', rangemode: 'tozero' },
          width: window.innerWidth * 0.9,
          height: window.innerHeight * 0.4,
          margin: { t: 50, r: 50, b: 100, l: 70 },
          plot_bgcolor: '#f9f9f9',
        }}
      />
    </div>
  );
};

export default AnalyticsDashboard;
