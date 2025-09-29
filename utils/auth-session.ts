const COOKIE_NAME = 'astrone_auth'
const COOKIE_VALUE = '1'

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

const buildCookieValue = () => {
  if (!isBrowser()) {
    return ''
  }

  const parts = [`${COOKIE_NAME}=${COOKIE_VALUE}`, 'path=/']
  const isHttps = window.location.protocol === 'https:'

  if (isHttps) {
    parts.push('SameSite=None', 'Secure')
  } else {
    parts.push('SameSite=Lax')
  }

  return parts.join('; ')
}

export const ensureAuthCookie = () => {
  if (!isBrowser()) {
    return
  }

  const value = buildCookieValue()
  if (value) {
    document.cookie = value
  }
}

export const recordAuthSession = () => {
  if (!isBrowser()) {
    return
  }

  ensureAuthCookie()

  try {
    window.sessionStorage.setItem(COOKIE_NAME, COOKIE_VALUE)
  } catch (error) {
    // Ignore storage exceptions (private browsing, disabled storage, etc.)
  }
}

export const hasAuthCookie = () => {
  if (!isBrowser()) {
    return false
  }

  return document.cookie.includes(`${COOKIE_NAME}=${COOKIE_VALUE}`)
}

export const hasRecordedSession = () => {
  if (!isBrowser()) {
    return false
  }

  if (hasAuthCookie()) {
    return true
  }

  try {
    return window.sessionStorage.getItem(COOKIE_NAME) === COOKIE_VALUE
  } catch (error) {
    return false
  }
}
