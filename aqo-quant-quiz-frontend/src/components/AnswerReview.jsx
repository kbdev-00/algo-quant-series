import React from 'react'
import { Link } from 'react-router-dom'

export default function AnswerReview({ result, quiz, answers }) {
  if (!quiz) return <div>Quiz data not found.</div>

  return (
    <div className="bg-white rounded shadow p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{quiz.title} — Review</h2>
        <div className="mt-2 text-sm text-gray-600">
          Final Score: <span className="font-semibold">{result.score}</span> / {result.total}
        </div>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q, idx) => {
          const userAnswerIdx = answers[q.id]
          const isCorrect = userAnswerIdx === q.answer
          const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50'

          return (
            <div key={q.id} className={`p-4 rounded border ${bgColor}`}>
              <div className="font-semibold text-sm">Question {idx + 1}</div>
              <div className="mt-2 font-medium">{q.text}</div>

              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const isUserChoice = userAnswerIdx === oi
                  const isCorrectAnswer = oi === q.answer
                  let btnClass = 'bg-gray-100'

                  if (isUserChoice && isCorrect) btnClass = 'bg-green-200'
                  else if (isUserChoice && !isCorrect) btnClass = 'bg-red-200'
                  else if (isCorrectAnswer) btnClass = 'bg-green-100'

                  return (
                    <div key={oi} className={`p-2 rounded ${btnClass}`}>
                      {String.fromCharCode(65 + oi)}. {opt}
                      {isUserChoice && <span className="ml-2 text-sm"> (Your answer)</span>}
                      {isCorrectAnswer && !isUserChoice && <span className="ml-2 text-sm text-green-700"> ✓ Correct</span>}
                    </div>
                  )
                })}
              </div>

              <div className="mt-2 text-sm">
                {isCorrect ? (
                  <span className="text-green-700 font-semibold">✓ Correct</span>
                ) : (
                  <span className="text-red-700 font-semibold">✗ Incorrect</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-3">
        <Link to="/leaderboard" className="px-4 py-2 bg-indigo-600 text-white rounded">View Leaderboard</Link>
        <Link to="/quizzes" className="px-4 py-2 border rounded">Take another</Link>
      </div>
    </div>
  )
}
