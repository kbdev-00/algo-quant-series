// Password validation utilities

export function validatePassword(password) {
  return {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
}

export function isPasswordStrong(criteria) {
  const checks = Object.values(criteria)
  const passedChecks = checks.filter(Boolean).length
  return passedChecks >= 4 // At least 4 out of 5 criteria
}

export function getPasswordStrength(password) {
  if (!password) return 'none'
  const criteria = validatePassword(password)
  const passedChecks = Object.values(criteria).filter(Boolean).length
  
  if (passedChecks <= 1) return 'weak'
  if (passedChecks <= 2) return 'fair'
  if (passedChecks <= 3) return 'good'
  return 'strong'
}
