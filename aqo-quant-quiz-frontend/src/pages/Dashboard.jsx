import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import quizzes from '../data/quizzes'

export default function Dashboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalScore: 0,
    averageScore: 0,
    passRate: 0,
    highestScore: 0
  })
  const [recentResults, setRecentResults] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('aqo_quant_leaderboard') || '[]')
    
    // Calculate stats
    if (data.length > 0) {
      const totalQuizzes = data.length
      const totalScore = data.reduce((sum, r) => sum + r.score, 0)
      const averageScore = (totalScore / totalScore * 100).toFixed(1)
      const highestScore = Math.max(...data.map(r => (r.score / r.total) * 100))
      const passCount = data.filter(r => (r.score / r.total) >= 0.6).length
      const passRate = ((passCount / totalQuizzes) * 100).toFixed(1)

      setStats({
        totalQuizzes,
        totalScore,
        averageScore,
        passRate,
        highestScore: highestScore.toFixed(1)
      })

      // Get recent results (last 5)
      setRecentResults(data.slice(-5).reverse())

      // Get leaderboard (top 10)
      const sorted = data.slice().sort((a, b) => (b.score / b.total) - (a.score / a.total))
      setLeaderboard(sorted.slice(0, 10))
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your Dashboard</h1>
        <Link to="/quizzes" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Take Quiz</Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Quizzes Taken</div>
          <div className="text-3xl font-bold mt-2">{stats.totalQuizzes}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Score</div>
          <div className="text-3xl font-bold mt-2">{stats.totalScore}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Avg. Accuracy</div>
          <div className="text-3xl font-bold mt-2">{stats.averageScore}%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Pass Rate</div>
          <div className="text-3xl font-bold mt-2">{stats.passRate}%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Highest Score</div>
          <div className="text-3xl font-bold mt-2">{stats.highestScore}%</div>
        </div>
      </div>

      {/* Recent Results Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Results</h2>
          <Link to="/leaderboard" className="text-sm text-indigo-600">View all</Link>
        </div>

        {recentResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No quiz results yet.</p>
            <Link to="/quizzes" className="text-indigo-600 mt-2 inline-block">Take your first quiz</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentResults.map((r, i) => {
              const percentage = ((r.score / r.total) * 100).toFixed(1)
              const isPassed = percentage >= 60
              return (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition">
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-gray-500">{new Date(r.timestamp).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                      {r.score}/{r.total} ({percentage}%)
                    </div>
                    <div className="text-xs text-gray-500">{isPassed ? '✓ Passed' : '✗ Failed'}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Top Performers</h2>
          <Link to="/leaderboard" className="text-sm text-indigo-600">Full leaderboard</Link>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Leaderboard coming soon!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((r, i) => {
              const percentage = ((r.score / r.total) * 100).toFixed(1)
              return (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="font-bold text-lg text-indigo-600 w-8">#{i + 1}</div>
                  <div className="flex-1">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-gray-500">{new Date(r.timestamp).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{percentage}%</div>
                    <div className="text-xs text-gray-500">{r.score}/{r.total}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 border">
          <h3 className="font-semibold text-lg mb-3">Quiz Categories</h3>
          <div className="space-y-2">
            {Array.from(new Set(quizzes.map(q => q.category))).map(cat => {
              const catQuizzes = quizzes.filter(q => q.category === cat)
              return (
                <div key={cat} className="flex items-center justify-between p-2">
                  <span>{cat}</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{catQuizzes.length} quizzes</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border">
          <h3 className="font-semibold text-lg mb-3">Your Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Accuracy</span>
                <span className="font-semibold">{stats.averageScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats.averageScore}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pass Rate</span>
                <span className="font-semibold">{stats.passRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats.passRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
