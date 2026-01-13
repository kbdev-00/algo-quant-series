import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import quizzes from '../data/quizzes'
import QuizSearch from '../components/QuizSearch'

export default function QuizList(){
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Available Quizzes</h2>
        <div className="text-sm text-gray-500">Updated weekly • New quizzes added</div>
      </div>

      <QuizSearch quizzes={quizzes} onFiltered={setFilteredQuizzes} />

      {filteredQuizzes.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredQuizzes.map(q=> (
            <Link key={q.id} to={`/quiz/${q.id}`} className="link-reset">
              <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between h-full clickable">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{q.title}</h3>
                    <div className="flex gap-2">
                      <div className="badge">{q.category}</div>
                      <div className={`badge text-xs ${q.difficulty === 'easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{q.questions.length} questions • {q.duration} min</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-indigo-600">Preview</div>
                  <div className="text-sm text-gray-500">Tap to start</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No quizzes found matching your criteria.</p>
          <button onClick={() => setFilteredQuizzes(quizzes)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
