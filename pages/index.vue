<script setup>
definePageMeta({
  layout: 'default',
  middleware: () => navigateTo('/home/dashboard', { replace: true })
})
</script>
