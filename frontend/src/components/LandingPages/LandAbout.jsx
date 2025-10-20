import React from 'react';
import Student from '../../assets/student.jpg';
import TPO from '../../assets/tpo.jpg';
import Management from '../../assets/management.jpg';
import Admin from '../../assets/admin.jpg';

function LandAbout() {
  const roles = [
    { title: "Student", image: Student, description: "Students can register, explore jobs, apply, and track applications with a dashboard." },
    { title: "TPO", image: TPO, description: "TPOs manage job postings, applications, and generate reports." },
    { title: "Management", image: Management, description: "Monitor placements, review analytics, and control access." },
    { title: "Admin", image: Admin, description: "Handle all roles, manage users, system settings, and operations." },
  ];

  return (
    <div id="about" className="bg-gray-50 py-12">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">About CPMS</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-md md:text-lg">
          Developed by final year students of The National Institute of Engineering Mysuru, CPMS is a web platform to manage campus placements efficiently.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-8 px-4">
        {roles.map((role, idx) => (
          <div key={idx} className="bg-white border border-gray-200 shadow-sm rounded-lg w-80 flex flex-col items-center p-5 hover:shadow-md transition">
            <img src={role.image} alt={role.title} className="w-40 h-40 object-cover rounded-full border-2 border-gray-300" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-gray-800 text-center">{role.title}</h3>
            <p className="text-gray-600 text-sm text-center">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandAbout;
