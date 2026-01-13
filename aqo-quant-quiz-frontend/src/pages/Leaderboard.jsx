import React from 'react'

export default function Leaderboard(){
  const data = JSON.parse(localStorage.getItem('aqo_quant_leaderboard') || '[]')
  // sort by score desc then time
  const sorted = data.slice().sort((a,b)=> b.score - a.score || a.timestamp - b.timestamp)

  if(sorted.length===0){
    return <div className="bg-white rounded p-6 shadow">No results yet. Take a quiz to appear on the leaderboard.</div>
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold">Leaderboard</h2>
      <div className="mt-4 space-y-3">
        {sorted.map((r, i)=> (
          <div key={i} className="flex items-center justify-between border p-3 rounded clickable hover:shadow-lg transition">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-gray-500">Submitted: {new Date(r.timestamp).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{r.score}/{r.total}</div>
              <div className="text-sm text-gray-500">Quiz: {r.quizId}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
