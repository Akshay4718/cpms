import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/backend_url';
import Toast from '../Toast';

function ManageApplicants() {
  document.title = 'CPMS | Manage Applicants';
  const { jobId } = useParams();
  
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [selectedForShortlist, setSelectedForShortlist] = useState([]);
  const [selectedForReject, setSelectedForReject] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [editingStatus, setEditingStatus] = useState({});
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchWorkflowStatus();
  }, [jobId]);

  const fetchWorkflowStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/placement-workflow/status/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setJob(response.data.job);
        setApplicants(response.data.applicants);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching workflow status:', error);
      setToastMessage('Failed to load applicants');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/placement-workflow/export/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Applicants_${job?.jobTitle}_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setToastMessage('Excel file downloaded successfully!');
      setShowToast(true);
      fetchWorkflowStatus();
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      setToastMessage('Failed to export Excel file');
      setShowToast(true);
    }
  };

  const handleMarkShortlisted = async () => {
    if (selectedForShortlist.length === 0 && selectedForReject.length === 0) {
      setToastMessage('Please select students to shortlist or reject');
      setShowToast(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/placement-workflow/shortlist/${jobId}`,
        {
          shortlistedStudentIds: selectedForShortlist,
          rejectedStudentIds: selectedForReject
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setToastMessage(response.data.message);
      setShowToast(true);
      setSelectedForShortlist([]);
      setSelectedForReject([]);
      fetchWorkflowStatus();
    } catch (error) {
      console.error('Error marking shortlisted:', error);
      setToastMessage(error.response?.data?.message || 'Failed to update shortlist');
      setShowToast(true);
    }
  };

  const toggleShortlist = (studentId) => {
    if (selectedForShortlist.includes(studentId)) {
      setSelectedForShortlist(selectedForShortlist.filter(id => id !== studentId));
    } else {
      setSelectedForShortlist([...selectedForShortlist, studentId]);
      setSelectedForReject(selectedForReject.filter(id => id !== studentId));
    }
  };

  const toggleReject = (studentId) => {
    if (selectedForReject.includes(studentId)) {
      setSelectedForReject(selectedForReject.filter(id => id !== studentId));
    } else {
      setSelectedForReject([...selectedForReject, studentId]);
      setSelectedForShortlist(selectedForShortlist.filter(id => id !== studentId));
    }
  };

  const handleStatusChange = async (studentId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      // Use shortlist endpoint for status changes
      let shortlistedIds = [];
      let rejectedIds = [];
      
      if (newStatus === 'shortlisted') {
        shortlistedIds = [studentId];
      } else if (newStatus === 'rejected') {
        rejectedIds = [studentId];
      } else if (newStatus === 'in-process' || newStatus === 'placed') {
        // For in-process and placed, we'll use direct status update
        const response = await axios.post(`${BASE_URL}/student/update-status/${jobId}/${studentId}`,
          { 
            applicant: { 
              applicationStatus: newStatus 
            } 
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        setToastMessage(`Status updated to ${newStatus}`);
        setShowToast(true);
        fetchWorkflowStatus();
        return;
      }

      const response = await axios.post(`${BASE_URL}/placement-workflow/shortlist/${jobId}`,
        {
          shortlistedStudentIds: shortlistedIds,
          rejectedStudentIds: rejectedIds
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setToastMessage(response.data.message);
      setShowToast(true);
      fetchWorkflowStatus();
    } catch (error) {
      console.error('Error updating status:', error);
      setToastMessage(error.response?.data?.message || 'Failed to update status');
      setShowToast(true);
    }
  };

  const getFilteredApplicants = () => {
    if (activeTab === 'all') return applicants;
    return applicants.filter(a => a.applicationStatus === activeTab);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'applied': { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'fa-paper-plane', label: 'Applied' },
      'shortlisted': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'fa-list-check', label: 'Shortlisted' },
      'in-process': { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'fa-spinner', label: 'In Process' },
      'placed': { bg: 'bg-green-100', text: 'text-green-700', icon: 'fa-circle-check', label: 'Placed' },
      'rejected': { bg: 'bg-red-100', text: 'text-red-700', icon: 'fa-circle-xmark', label: 'Rejected' }
    };

    const badge = badges[status] || badges['applied'];
    return (
      <span className={`inline-flex items-center gap-1 ${badge.bg} ${badge.text} px-3 py-1 rounded-full text-xs font-semibold`}>
        <i className={`fa-solid ${badge.icon}`}></i>
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="container-fluid py-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{job?.jobTitle || 'Job Details'}</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Company:</span> {job?.company?.companyName || 'N/A'}
                {job?.company?.companyLocation && (
                  <span className="ml-2 text-sm">
                    <i className="fa-solid fa-location-dot"></i> {job?.company?.companyLocation}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <i className="fa-solid fa-file-excel"></i>
              Export to Excel
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.total || 0}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.applied || 0}</div>
              <div className="text-xs text-gray-600">Applied</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.shortlisted || 0}</div>
              <div className="text-xs text-gray-600">Shortlisted</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.inProcess || 0}</div>
              <div className="text-xs text-gray-600">In Process</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.placed || 0}</div>
              <div className="text-xs text-gray-600">Placed</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected || 0}</div>
              <div className="text-xs text-gray-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="flex gap-2 p-2 overflow-x-auto">
            {['all', 'applied', 'shortlisted', 'in-process', 'placed', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {activeTab === 'applied' && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Selected: {selectedForShortlist.length} for shortlist, {selectedForReject.length} for reject
              </div>
              <button
                onClick={handleMarkShortlisted}
                disabled={selectedForShortlist.length === 0 && selectedForReject.length === 0}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300"
              >
                Update Status
              </button>
            </div>
          </div>
        )}

        {/* Applicants Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  {activeTab === 'applied' && <th className="px-4 py-3 text-left text-sm font-semibold">Select</th>}
                  <th className="px-4 py-3 text-left text-sm font-semibold">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Current Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Applied On</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredApplicants().length > 0 ? (
                  getFilteredApplicants().map((applicant, index) => (
                    <tr key={applicant._id} className="hover:bg-gray-50">
                      {activeTab === 'applied' && (
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedForShortlist.includes(applicant.studentId._id)}
                                onChange={() => toggleShortlist(applicant.studentId._id)}
                                className="w-4 h-4 text-green-600 rounded"
                              />
                              <span className="text-xs text-green-700">✓</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedForReject.includes(applicant.studentId._id)}
                                onChange={() => toggleReject(applicant.studentId._id)}
                                className="w-4 h-4 text-red-600 rounded"
                              />
                              <span className="text-xs text-red-700">✗</span>
                            </label>
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {applicant.studentId.first_name} {applicant.studentId.last_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{applicant.studentId.email}</td>
                      <td className="px-4 py-3 text-sm">{getStatusBadge(applicant.applicationStatus)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(applicant.appliedAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={applicant.applicationStatus}
                          onChange={(e) => handleStatusChange(applicant.studentId._id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="applied">Applied</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="in-process">In Process</option>
                          <option value="placed">Placed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeTab === 'applied' ? 8 : 7} className="px-4 py-8 text-center text-gray-500">
                      No applicants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageApplicants;
