import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SignInSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const navigate = useNavigate(); // Hook for navigation

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User signed up successfully');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('User signed in successfully');
      }
      navigate('/das'); // Redirect to home page after success
    } catch (error) {
      console.error('Error with authentication:', error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('User signed in with Google');
      navigate('/das'); // Redirect to home page after success
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-900 text-white font-sans">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          {isSignUp ? 'Create Account' : 'Welcome Back!'}
        </h2>
        <form className="space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <span className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-indigo-600 font-semibold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </span>
        </div>

        <div className="mt-8">
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg bg-white hover:bg-gray-100 transition ease-in-out duration-300"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
