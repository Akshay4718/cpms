import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/backend_url';

function NoticeBox() {
  const [loading, setLoading] = useState(true);
  const [noticesData, setNoticesData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/user/detail`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser({ role: response.data.role });
      } catch (error) {
        console.log('Error fetching user details => ', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser?.role) {
      fetchNotices();
    }
  }, [currentUser?.role]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/management/get-all-notices`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      let filteredNotices = [];
      if (currentUser?.role === 'management_admin') {
        filteredNotices = response.data.filter((n) => n.sender_role === 'tpo_admin');
      } else if (currentUser?.role === 'tpo_admin') {
        filteredNotices = response.data.filter((n) => n.receiver_role === 'tpo_admin');
      } else if (currentUser?.role === 'student') {
        filteredNotices = response.data.filter((n) => n.receiver_role === 'student');
      }

      setNoticesData(filteredNotices);
    } catch (error) {
      console.log('Error while fetching notices => ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-3 mx-2 w-full backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/10 border border-white/30 rounded-xl py-4 px-5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 border-b border-gray-300/50 pb-2">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-bullhorn text-blue-600"></i> Notice Board
        </h3>

        <span>
          {currentUser?.role === 'student' && (
            <Link to="/student/all-notice" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </Link>
          )}
          {currentUser?.role === 'tpo_admin' && (
            <Link to="/tpo/all-notice" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </Link>
          )}
          {currentUser?.role === 'management_admin' && (
            <Link to="/management/all-notice" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </Link>
          )}
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
        </div>
      ) : (
        <div className="relative h-72 overflow-hidden">
          <div className="absolute bottom-0 w-full h-full animate-scrollUp space-y-4 px-1">
            {noticesData?.length > 0 ? (
              noticesData.map((notice, index) => {
                const isNew =
                  (new Date() - new Date(notice?.createdAt)) / (1000 * 60 * 60 * 24) <= 2;

                return (
                  <div
                    key={index}
                    className="bg-white/70 hover:bg-white/90 border border-gray-200 rounded-lg p-3 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Link
                      className="text-blue-700 hover:text-blue-900 font-medium text-base no-underline"
                      to={
                        currentUser?.role === 'student'
                          ? `/student/notice/${notice?._id}`
                          : currentUser?.role === 'tpo_admin'
                          ? `/tpo/notice/${notice?._id}`
                          : currentUser.role === 'management_admin'
                          ? `/management/notice/${notice?._id}`
                          : ''
                      }
                      target="_blank"
                    >
                      {notice?.title}
                      {isNew && (
                        <Badge
                          bg="primary"
                          className="ml-2 text-xs px-2 py-1 rounded-md"
                          style={{ verticalAlign: 'middle' }}
                        >
                          New
                        </Badge>
                      )}
                    </Link>

                    <div className="text-gray-500 text-sm mt-1">
                      {new Date(notice?.createdAt).toLocaleDateString('en-IN')}{' '}
                      {new Date(notice?.createdAt).toLocaleTimeString('en-IN')}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 mt-10">No notices found!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeBox;
