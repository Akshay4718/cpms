import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/backend_url';
import { FaVideo, FaCalendarAlt, FaClock, FaUser, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

function OnlineMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/meeting/student/upcoming`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setMeetings(response.data.meetings);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short'
    });
  };

  const isJoinable = (scheduledTime) => {
    const meetingTime = new Date(scheduledTime);
    const now = new Date();
    const diffMinutes = (meetingTime - now) / (1000 * 60);
    
    return diffMinutes <= 15 && diffMinutes >= -30;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="mb-2">
          <FaVideo className="me-2 text-primary" />
          Online Meetings
        </h3>
        <p className="text-muted">Join scheduled meetings with TPO and recruiters</p>
      </div>

      {/* Info Banner */}
      <div className="alert alert-info mb-4">
        <FaInfoCircle className="me-2" />
        <strong>Note:</strong> You can join meetings 15 minutes before the scheduled time
      </div>

      {/* Meetings List */}
      <div className="row g-3">
        {meetings.length === 0 ? (
          <div className="col-12">
            <div className="card text-center py-5">
              <div className="card-body">
                <FaVideo size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No Upcoming Meetings</h5>
                <p className="text-muted">You'll receive an email when new meetings are scheduled</p>
              </div>
            </div>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting._id} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5 className="card-title mb-2">{meeting.title}</h5>
                      <p className="card-text text-muted mb-3">{meeting.description}</p>
                      
                      <div className="d-flex flex-wrap gap-3 text-muted small">
                        <div>
                          <FaCalendarAlt className="me-2 text-primary" />
                          {formatDateTime(meeting.scheduledTime)}
                        </div>
                        <div>
                          <FaClock className="me-2 text-primary" />
                          {meeting.duration} minutes
                        </div>
                        <div>
                          <FaUser className="me-2 text-primary" />
                          {meeting.hostName}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      {isJoinable(meeting.scheduledTime) ? (
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-lg"
                        >
                          <FaExternalLinkAlt className="me-2" />
                          Join Meeting
                        </a>
                      ) : (
                        <button className="btn btn-secondary btn-lg" disabled>
                          Not Yet Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OnlineMeetings;
