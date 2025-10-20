import React, { useState } from 'react';
import HeroImg from '../../assets/heroImg.jpg';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/image.png';

function LandingHeroPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleCreateAccount = () => {
    navigate('/student/signup', email.trim() ? { state: { prefillEmail: email } } : {});
  };

  const handleScrollAbout = () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-20 max-w-5xl text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Empower Your Career with <br />
          <span className="text-green-400">CPMS Portal</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-gray-200 text-lg sm:text-xl font-light">
          Discover opportunities, track progress, and connect with your TPO — all in one place.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="px-4 sm:px-5 py-2 sm:py-3 w-72 sm:w-96 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
          />
          <button
            className="bg-gray-900 hover:bg-gray-700 transition px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-semibold shadow-md"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>

        <p
          className="mt-6 text-sm text-gray-300 hover:text-white cursor-pointer underline"
          onClick={handleScrollAbout}
        >
          Learn more about CPMS
        </p>
      </div>
    </section>
  );
}

export default LandingHeroPage;
