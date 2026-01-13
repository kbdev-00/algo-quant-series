import React from 'react'
import { validatePassword, getPasswordStrength } from '../utils/passwordValidator'

export default function PasswordCriteria({ password }) {
  const criteria = validatePassword(password)
  const strength = getPasswordStrength(password)

  const getStrengthColor = (s) => {
    if (s === 'weak') return 'bg-red-500'
    if (s === 'fair') return 'bg-yellow-500'
    if (s === 'good') return 'bg-blue-500'
    if (s === 'strong') return 'bg-green-500'
    return 'bg-gray-300'
  }

  const getStrengthLabel = (s) => {
    if (s === 'weak') return 'Weak'
    if (s === 'fair') return 'Fair'
    if (s === 'good') return 'Good'
    if (s === 'strong') return 'Strong'
    return 'No password'
  }

  return (
    <div className="mt-3 space-y-3">
      {/* Strength bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-600">Password Strength</span>
          <span className={`text-xs font-semibold ${
            strength === 'weak' ? 'text-red-600' :
            strength === 'fair' ? 'text-yellow-600' :
            strength === 'good' ? 'text-blue-600' :
            strength === 'strong' ? 'text-green-600' :
            'text-gray-600'
          }`}>
            {getStrengthLabel(strength)}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${getStrengthColor(strength)}`}
            style={{
              width: strength === 'weak' ? '25%' : 
                     strength === 'fair' ? '50%' :
                     strength === 'good' ? '75%' :
                     strength === 'strong' ? '100%' : '0%'
            }}
          ></div>
        </div>
      </div>

      {/* Criteria checklist */}
      <div className="bg-gray-50 rounded p-3 space-y-2">
        <div className="text-xs font-medium text-gray-700">Password must contain:</div>
        
        <div className={`flex items-center gap-2 text-sm ${criteria.minLength ? 'text-green-700' : 'text-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${criteria.minLength ? 'bg-green-200' : 'bg-gray-200'}`}>
            {criteria.minLength ? '✓' : '○'}
          </span>
          <span>At least 8 characters</span>
        </div>

        <div className={`flex items-center gap-2 text-sm ${criteria.hasUpperCase ? 'text-green-700' : 'text-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${criteria.hasUpperCase ? 'bg-green-200' : 'bg-gray-200'}`}>
            {criteria.hasUpperCase ? '✓' : '○'}
          </span>
          <span>One uppercase letter (A-Z)</span>
        </div>

        <div className={`flex items-center gap-2 text-sm ${criteria.hasLowerCase ? 'text-green-700' : 'text-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${criteria.hasLowerCase ? 'bg-green-200' : 'bg-gray-200'}`}>
            {criteria.hasLowerCase ? '✓' : '○'}
          </span>
          <span>One lowercase letter (a-z)</span>
        </div>

        <div className={`flex items-center gap-2 text-sm ${criteria.hasNumber ? 'text-green-700' : 'text-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${criteria.hasNumber ? 'bg-green-200' : 'bg-gray-200'}`}>
            {criteria.hasNumber ? '✓' : '○'}
          </span>
          <span>One number (0-9)</span>
        </div>

        <div className={`flex items-center gap-2 text-sm ${criteria.hasSpecialChar ? 'text-green-700' : 'text-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${criteria.hasSpecialChar ? 'bg-green-200' : 'bg-gray-200'}`}>
            {criteria.hasSpecialChar ? '✓' : '○'}
          </span>
          <span>One special character (!@#$%^&*)</span>
        </div>
      </div>
    </div>
  )
}
