import { getCookie, sendRedirect } from 'h3'

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
    if (!document.cookie.includes('astrone_auth=1')) {
      return navigateTo('/password?redirect=' + encodeURIComponent(to.fullPath), { replace: true })
    }
  }
})
