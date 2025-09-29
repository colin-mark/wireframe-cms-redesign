import { getCookie, sendRedirect } from 'h3'
import { ensureAuthCookie, hasAuthCookie, hasRecordedSession } from '~/utils/auth-session'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/password') {
    return
  }

  if (process.server) {
    const event = useRequestEvent()
    const cookie = getCookie(event, 'astrone_auth')

    if (cookie !== '1') {
      return sendRedirect(event, '/password?redirect=' + encodeURIComponent(to.fullPath))
    }
  } else {
    if (!hasRecordedSession()) {
      return navigateTo('/password?redirect=' + encodeURIComponent(to.fullPath), { replace: true })
    }

    if (!hasAuthCookie()) {
      ensureAuthCookie()
    }
  }
})
