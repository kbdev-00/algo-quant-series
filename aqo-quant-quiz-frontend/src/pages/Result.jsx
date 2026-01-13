import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import quizzes from '../data/quizzes'
import AnswerReview from '../components/AnswerReview'

export default function Result(){
  const loc = useLocation()
  const result = loc.state?.result
  const quiz = loc.state?.quiz || quizzes.find(q => q.id === result?.quizId)
  const answers = loc.state?.answers
  const [showReview, setShowReview] = useState(false)

  if(!result){
    return <div className="bg-white rounded p-6 shadow">No result found. Try taking a quiz first. <Link to="/quizzes" className="text-indigo-600"> Browse quizzes</Link></div>
  }

  if (showReview && quiz && answers) {
    return <AnswerReview result={result} quiz={quiz} answers={answers} />
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold">Result — {result.title}</h2>
      <div className="mt-4 text-gray-700">Score: <span className="font-medium text-lg">{result.score}</span> / {result.total}</div>
      <div className="mt-2 text-sm text-gray-500">Submitted at: {new Date(result.timestamp).toLocaleString()}</div>
      <div className="mt-4 flex gap-3">
        <button onClick={() => setShowReview(true)} className="px-4 py-2 bg-indigo-600 text-white rounded">Review Answers</button>
        <Link to="/leaderboard" className="px-4 py-2 bg-gray-600 text-white rounded">View Leaderboard</Link>
        <Link to="/quizzes" className="px-4 py-2 border rounded">Take another</Link>
      </div>
    </div>
  )
}
