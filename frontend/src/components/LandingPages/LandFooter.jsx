import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandFooter() {
  const navigate = useNavigate();
  const loginLinks = [
    { label: 'Login as TPO', path: '/tpo/login' },
    { label: 'Login as Management', path: '/management/login' },
    { label: 'Login as Admin', path: '/admin' },
  ];

  return (
    <footer className="bg-gray-50 text-gray-800 py-10 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {loginLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => navigate(link.path)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-sm shadow-sm transition"
            >
              {link.label}
            </button>
          ))}
        </div>
        <p className="text-gray-600 text-sm">© 2025 College Placement Management System. All rights reserved.</p>
        <p className="text-gray-500 text-xs mt-1">Developed by Final Year Students of The National Institute of Engineering, Mysuru</p>
      </div>
    </footer>
  );
}

export default LandFooter;
