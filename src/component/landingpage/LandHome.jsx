import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const LandHome = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="text-xl font-bold text-blue-600">SocialPulse</div>
          <a href="/signin" className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Sign In
          </a>
          <div className="md:hidden">
            <button className="text-gray-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Analyze your social media with <span className="text-blue-600">SocialPulse</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Say hello to SocialPulse, your real-time analytics dashboard that captures the heartbeat of your audience and drives engagement, brought to you by our dedicated team.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Get Started
              </a>
            </div>
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex justify-center">
            <img
              src="https://sb-ui-kit-pro-vue.startbootstrap.com/assets/img/drawkit/color/drawkit-content-man-color.svg"
              alt="Illustration"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <section className="bg-gradient-to-r from-white to-purple-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">What we Offer?</h2>
          <p className="text-gray-600 mb-12">
            In virtual space through communication platforms. Durable relations that extend beyond immediate genealogical ties.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-blue-500 text-2xl" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="text-red-600 text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-pink-500 text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 text-2xl" />
            </a>
          </div>

          {/* Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <img src="https://sb-ui-kit-pro-vue.startbootstrap.com/assets/img/drawkit/color/drawkit-content-man-color.svg" alt="Community Support" className="h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Apps keep work and information right at your fingertips—and Slack keeps it all securely.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <img src="https://sb-ui-kit-pro-vue.startbootstrap.com/assets/img/drawkit/color/drawkit-content-man-color.svg" alt="Security First" className="h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Security First</h3>
              <p className="text-gray-600">
                Connect the tools you already use to get more from them every time you work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <img src="https://sb-ui-kit-pro-vue.startbootstrap.com/assets/img/drawkit/color/drawkit-content-man-color.svg" alt="24/7 Admin Support" className="h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-2">24/7 Admin Support</h3>
              <p className="text-gray-600">
                You can work with apps in channels, where they're a seamless part of the conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-600 py-10">
        <div className="container mx-auto text-center">
          <p className="text-white font-medium mb-4">Sign up for coupons, updates, and other fun stuff!</p>
          <div className="flex justify-center mb-6">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-full w-80 border-none" />
            <button className="bg-green-700 text-white px-6 py-2 rounded-r-full hover:bg-green-800">Submit</button>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-white h-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-white h-8" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="text-white h-8" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-white h-8" />
            </a>
          </div>
          <div className="text-white text-sm">
            <p className="mb-2">
              <a href="#" className="hover:underline">Contact</a> | <a href="#" className="hover:underline">FAQ</a> | <a href="#" className="hover:underline">About Us</a>
            </p>
    
          </div>
        </div>
      </footer>
    </div>
  );
};
