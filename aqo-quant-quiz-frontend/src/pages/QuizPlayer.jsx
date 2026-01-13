import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import quizzes from '../data/quizzes'
import QuizReviewModal from '../components/QuizReviewModal'

export default function QuizPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quiz = quizzes.find(q => q.id === id)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [marked, setMarked] = useState(new Set())
  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.duration * 60 : 0)
  const [showReview, setShowReview] = useState(false)
  const [timerWarning, setTimerWarning] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!quiz) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleSubmit()
          return 0
        }
        // Timer warnings
        if (t === 60) setTimerWarning('⏰ 1 minute left!')
        else if (t === 30) setTimerWarning('⏰ 30 seconds left!')
        else if (t === 10) setTimerWarning('⏰ 10 seconds!')
        else setTimerWarning(null)

        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [quiz])

  if(!quiz){
    return <div className="bg-white rounded p-6 shadow">Quiz not found</div>
  }

  const q = quiz.questions[index]
  const answered = Object.keys(answers).length

  function choose(optIndex) {
    setAnswers(a => ({ ...a, [q.id]: optIndex }))
  }

  function toggleMark() {
    const newMarked = new Set(marked)
    if (newMarked.has(q.id)) newMarked.delete(q.id)
    else newMarked.add(q.id)
    setMarked(newMarked)
  }

  function handleSubmit(){
    let score = 0
    quiz.questions.forEach(quest=>{
      if(answers[quest.id] === quest.answer) score += 1
    })
    const result = {
      quizId: quiz.id,
      title: quiz.title,
      total: quiz.questions.length,
      score,
      answers,
      timestamp: Date.now()
    }
    const key = 'aqo_quant_leaderboard'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push(result)
    localStorage.setItem(key, JSON.stringify(existing))
    navigate('/result', { state: { result, quiz, answers }})
  }

  const timerColor = timeLeft <= 10 ? 'text-red-600' : timeLeft <= 30 ? 'text-yellow-600' : 'text-indigo-600'

  return (
    <>
      {timerWarning && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded animate-pulse">
          {timerWarning}
        </div>
      )}

      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-xl">{quiz.title}</h3>
            <div className="text-sm text-gray-600">
              Q {index + 1} of {quiz.questions.length} • Answered: {answered}/{quiz.questions.length}
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded h-2">
              <div
                className="bg-indigo-600 h-2 rounded transition-all"
                style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className={`text-sm font-semibold ${timerColor}`}>
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-lg font-medium">{q.text}</div>
          <div className="mt-3 grid gap-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => choose(oi)}
                className={`text-left p-3 rounded border transition ${
                  answers[q.id] === oi
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{String.fromCharCode(65 + oi)}. {opt}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="space-x-2">
            <button
              disabled={index === 0}
              onClick={() => setIndex(i => i - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={index === quiz.questions.length - 1}
              onClick={() => setIndex(i => i + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="space-x-2">
            <button
              onClick={toggleMark}
              className={`px-3 py-1 rounded ${
                marked.has(q.id)
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-gray-100'
              }`}
            >
              {marked.has(q.id) ? '⭐ Marked' : 'Mark'}
            </button>
            <button
              onClick={() => setShowReview(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Review & Submit
            </button>
          </div>
        </div>
      </div>

      {showReview && (
        <QuizReviewModal
          quiz={quiz}
          answers={answers}
          onCancel={() => setShowReview(false)}
          onConfirm={handleSubmit}
        />
      )}
    </>
  )
}
