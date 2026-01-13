import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import ToastContainer from './components/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import QuizList from './pages/QuizList'
import QuizPlayer from './pages/QuizPlayer'
import Result from './pages/Result'
import Leaderboard from './pages/Leaderboard'

function AppRoutes() {
  const { user } = useUser()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ToastContainer />
      <main className="flex-1 container mx-auto px-4 py-8 container-max">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp/>} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login/>} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/quizzes" element={<ProtectedRoute><QuizList/></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><QuizPlayer/></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result/></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard/></ProtectedRoute>} />
        </Routes>
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-600">Aqo Quant • Frontend Demo</footer>
    </div>
  )
}

export default function App(){
  return (
    <ToastProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </ToastProvider>
  )
}
