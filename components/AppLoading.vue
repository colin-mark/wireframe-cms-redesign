<template>
  <div class="fixed inset-0 bg-astra-white z-50 flex items-center justify-center">
    <div class="flex flex-col items-center space-y-4">
      <!-- Custom Astrone Loading Spinner -->
      <div class="relative">
        <div class="w-12 h-12 bg-astra-blue rounded-lg flex items-center justify-center animate-pulse">
          <span class="text-astra-white font-bold text-lg">A</span>
        </div>
      </div>
      
      <!-- Loading Text -->
      <div class="text-astra-gray-600 text-sm font-medium">
        Loading...
      </div>
    </div>
  </div>
</template>

<script setup>
// This component can be used as a custom loading indicator
</script>
