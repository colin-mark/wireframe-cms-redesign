<script setup>
import { navigateTo, useRequestEvent } from '#app'

// Redirect legacy Features → General route to the new General CMS Settings screen.
if (import.meta.server) {
  const event = useRequestEvent()
  if (event) {
    event.node.res.statusCode = 301
    event.node.res.setHeader('Location', '/settings/general')
    event.node.res.end()
  }
} else {
  await navigateTo('/settings/general', { redirectCode: 301, replace: true })
}

definePageMeta({
  layout: 'default'
})
</script>
