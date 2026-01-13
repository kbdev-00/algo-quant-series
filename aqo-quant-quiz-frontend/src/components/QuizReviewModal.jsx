import React from 'react'

// Review answers modal before submit
export default function QuizReviewModal({ quiz, answers, onConfirm, onCancel }) {
  const answered = Object.keys(answers).length
  const total = quiz.questions.length
  const unanswered = total - answered

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Review Before Submit</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between p-3 bg-indigo-50 rounded">
            <span>Total Questions</span>
            <span className="font-semibold">{total}</span>
          </div>
          <div className="flex justify-between p-3 bg-green-50 rounded">
            <span>Answered</span>
            <span className="font-semibold text-green-700">{answered}</span>
          </div>
          {unanswered > 0 && (
            <div className="flex justify-between p-3 bg-yellow-50 rounded">
              <span>Unanswered</span>
              <span className="font-semibold text-yellow-700">{unanswered}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="flex-1 px-3 py-2 border rounded-lg">
            Go Back
          </button>
          <button onClick={onConfirm} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg">
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  )
}
