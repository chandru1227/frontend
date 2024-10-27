
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Navbar from './Navbar';
const YouTubeForm = () => {
  const [channelId, setChannelId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [channelStats, setChannelStats] = useState(null);
  const [videoDetails, setVideoDetails] = useState([]);
  const [topVideos, setTopVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(10);
  const [videoUrl, setVideoUrl] = useState('');
  const [sentimentResults, setSentimentResults] = useState(null); //

  // Handle submitting the channel ID form
  const handleChannelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/youtube/${channelId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChannelStats(data.channel_stats[0]);
      setVideoDetails(data.video_details);
      setCurrentPage(1); // Reset to the first page when new data is loaded
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };


  // Handle submitting the search form
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for term:', searchTerm); // Add this line
    try {
      const response = await fetch(`http://127.0.0.1:5000/youtube/search/${searchTerm}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTopVideos(data.top_videos);
      setChannelStats(null); // Clear previous channel stats
      setVideoDetails([]); // Clear previous video details
      setCurrentPage(1); // Reset to the first page when new data is loaded
    } catch (error) {
      console.error('Error fetching YouTube search data:', error);
    }
  };

  const handleAnalyzeComments = async (e) => {
    e.preventDefault();
    try {
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      const response = await fetch(`http://127.0.0.1:5000/youtube/comments/${videoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSentimentResults(data);
    } catch (error) {
      console.error('Error analyzing video comments:', error);
      alert('An error occurred while analyzing comments. Please try again.');
    }
  };

  // Pagination logic for video details
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videoDetails.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videoDetails.length / videosPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
    <Navbar />
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">YouTube Analytics</h2>

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">YouTube Channel Analytics</h2>
      <form onSubmit={handleChannelSubmit}>
        <div className="mb-6">
          <label htmlFor="channel_id" className="block text-gray-700 font-semibold mb-2">
            Enter Channel ID:
          </label>
          <input
            type="text"
            id="channel_id"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Enter YouTube Channel ID"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 shadow-sm"
        >
          Submit
        </button>
      </form>

      {channelStats && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Channel Stats:</h3>
          <p className="mt-2 text-gray-600">Channel Name: {channelStats.Channel_name}</p>
          <p className="mt-2 text-gray-600">Subscribers: {channelStats.Subscribers}</p>
          <p className="mt-2 text-gray-600">Views: {channelStats.Views}</p>
          <p className="mt-2 text-gray-600">Total Videos: {channelStats.Total_videos}</p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">Graphs:</h3>
            {videoDetails.length > 0 && (
              <>
                <Plot
                  data={[
                    {
                      x: videoDetails.map((video) => video.Title),
                      y: videoDetails.map((video) => video.Views),
                      type: 'bar',
                      marker: { color: 'blue' },
                    },
                  ]}
                  layout={{ title: 'Views per Video', xaxis: { title: 'Video Titles' }, yaxis: { title: 'Number of Views' } }}
                  style={{ width: '100%', height: '400px' }}
                />
                <Plot
                  data={[
                    {
                      x: videoDetails.map((video) => video.Likes),
                      y: videoDetails.map((video) => video.Views),
                      mode: 'markers',
                      type: 'scatter',
                      marker: { color: 'red' },
                      text: videoDetails.map((video) => video.Title),
                    },
                  ]}
                  layout={{ title: 'User Interaction (Likes vs Views)', xaxis: { title: 'Likes' }, yaxis: { title: 'Views' } }}
                  style={{ width: '100%', height: '400px' }}
                />
                <Plot
                  data={[
                    {
                      x: videoDetails.map((video) => video.Title),
                      y: videoDetails.map((video) => video.Likes),
                      type: 'bar',
                      marker: { color: 'green' },
                    },
                  ]}
                  layout={{ title: 'Likes per Video', xaxis: { title: 'Video Titles' }, yaxis: { title: 'Number of Likes' } }}
                  style={{ width: '100%', height: '400px' }}
                />
              </>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold mt-6 text-gray-800">Video Details:</h3>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Published Date</th>
                  <th className="border px-4 py-2 text-left">Views</th>
                  <th className="border px-4 py-2 text-left">Likes</th>
                  <th className="border px-4 py-2 text-left">Comments</th>
                </tr>
              </thead>
              <tbody>
                {currentVideos.map((video, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{video.Title}</td>
                    <td className="border px-4 py-2">{video.Published_date}</td>
                    <td className="border px-4 py-2">{video.Views}</td>
                    <td className="border px-4 py-2">{video.Likes}</td>
                    <td className="border px-4 py-2">{video.Comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* Search Tags Form */}
      <form onSubmit={handleSearchSubmit} className="mt-8">
        <div className="mb-6">
          <label htmlFor="search_term" className="block text-gray-700 font-semibold mb-2">
            Enter Search Term:
          </label>
          <input
            type="text"
            id="search_term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="e.g., learn deep learning"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 shadow-sm"
        >
          Search Videos
        </button>
      </form>

      {/* Channel Stats */}
    
      {/* Top Videos Search Results */}
{topVideos.length > 0 && (
  <div className="mt-8">
    <h3 className="text-xl font-bold text-gray-800">Top Videos for "{searchTerm}":</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {topVideos.map((video, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          {/* Top Half: Thumbnail */}
          <div className="w-full h-48 overflow-hidden">
            <img src={video.Thumbnail} alt={video.Title} className="w-full h-full object-cover" />
          </div>
          
          {/* Bottom Half: Video Details */}
          <div className="p-4 flex flex-col space-y-2">
            <h4 className="font-semibold text-gray-800 line-clamp-2">{video.Title}</h4>
            <p className="text-sm text-gray-500">Channel Name</p>
            <p className="text-xs text-gray-500">{new Date(video.Published_date).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500">Views: {video.Views}</p>
            <a
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 text-sm flex items-center"
            >
              ▶ Watch Video
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


       {/* Analyze Comments Form */}
       <form onSubmit={handleAnalyzeComments} className="mt-6">
        <div className="mb-6">
          <label htmlFor="video_url" className="block text-gray-700 font-semibold mb-2">
            Enter Video URL:
          </label>
          <input
            type="text"
            id="video_url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Enter YouTube Video URL"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Analyze Comments
        </button>
      </form>

      {/* Display Sentiment Analysis Results */}
      {sentimentResults && (
  <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
    <h3 className="text-xl font-semibold">Comment Analysis</h3>
    <p>Total Comments: {sentimentResults.total_comments}</p>
    <p>Positive Comments: {sentimentResults.positive_comments}</p>
    <p>Negative Comments: {sentimentResults.negative_comments}</p>
    
    {/* Bar chart for sentiment analysis */}
    <Plot
      data={[
        {
          x: ['Positive Comments', 'Negative Comments'],
          y: [sentimentResults.positive_comments, sentimentResults.negative_comments],
          type: 'bar',
          marker: { color: ['#4CAF50', '#F44336'] }, // Green for positive, red for negative
        },
      ]}
      layout={{
        title: 'Sentiment Analysis of Comments',
        xaxis: { title: 'Sentiment' },
        yaxis: { title: 'Number of Comments' },
      }}
      config={{ responsive: true }}
    />
  </div>
)}

    </div>
    </div>
  );
};

export default YouTubeForm;