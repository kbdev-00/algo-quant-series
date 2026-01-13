import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateUser, logout } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage('All fields are required');
      return;
    }
    updateUser(formData);
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get quiz stats from localStorage
  const results = JSON.parse(localStorage.getItem('aqo_quant_leaderboard') || '[]');
  const userResults = results.filter(r => r.email === user?.email);
  const totalQuizzes = userResults.length;
  const totalScore = userResults.reduce((sum, r) => sum + r.score, 0);
  const avgScore = totalQuizzes > 0 ? (totalScore / totalQuizzes).toFixed(2) : 0;
  const passedQuizzes = userResults.filter(r => r.score >= 70).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
              >
                Save Changes
              </button>
            </form>
          )}

          {message && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
              {message}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600">{totalQuizzes}</p>
            <p className="text-gray-600 text-sm">Quizzes Taken</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{passedQuizzes}</p>
            <p className="text-gray-600 text-sm">Passed</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-cyan-600">{avgScore}</p>
            <p className="text-gray-600 text-sm">Avg Score</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{totalScore}</p>
            <p className="text-gray-600 text-sm">Total Score</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Quiz Attempts</h2>
          {userResults.length > 0 ? (
            <div className="space-y-3">
              {userResults.slice(-5).reverse().map((result, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{result.quizTitle}</p>
                    <p className="text-sm text-gray-600">{new Date(result.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.score}%
                    </p>
                    <p className="text-xs text-gray-600">{result.score >= 70 ? '✓ Passed' : '✗ Failed'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No quiz attempts yet. Start taking quizzes!</p>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">Member Since</p>
                <p className="text-sm text-gray-600">{new Date(user?.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
