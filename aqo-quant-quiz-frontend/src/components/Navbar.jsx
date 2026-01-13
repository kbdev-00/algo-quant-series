import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const { user, logout } = useUser()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="logo-mark">AQ</div>
          <div>
            <NavLink to="/" className="text-2xl font-extrabold text-slate-800">Aqo Quant</NavLink>
            <div className="text-xs text-gray-500">DSA • Aptitude</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          <NavLink to="/" className={({isActive})=>isActive? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}>Home</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={({isActive})=>isActive? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}>Dashboard</NavLink>
              <NavLink to="/quizzes" className={({isActive})=>isActive? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}>Quizzes</NavLink>
              <NavLink to="/leaderboard" className={({isActive})=>isActive? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}>Leaderboard</NavLink>
            </>
          )}
          {user ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l">
              <span className="text-sm font-medium">{user.name}</span>
              <NavLink to="/profile" className={({isActive})=>isActive? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}>Profile</NavLink>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded">Logout</button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="text-indigo-600 font-semibold">Login</NavLink>
              <NavLink to="/signup" className="px-3 py-1 bg-indigo-600 text-white rounded">Sign Up</NavLink>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={()=> setOpen(o=>!o)} className="p-2 rounded bg-indigo-50 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'block text-indigo-600 font-semibold' : 'block'}>Home</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'block text-indigo-600 font-semibold' : 'block'}>Dashboard</NavLink>
              <NavLink to="/quizzes" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'block text-indigo-600 font-semibold' : 'block'}>Quizzes</NavLink>
              <NavLink to="/leaderboard" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'block text-indigo-600 font-semibold' : 'block'}>Leaderboard</NavLink>
              <NavLink to="/profile" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'block text-indigo-600 font-semibold' : 'block'}>Profile</NavLink>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-1 bg-red-600 text-white rounded mt-2">Logout ({user.name})</button>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login" onClick={()=>setOpen(false)} className="block">Login</NavLink>
              <NavLink to="/signup" onClick={()=>setOpen(false)} className="block px-3 py-1 bg-indigo-600 text-white rounded">Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  )
}
