<template>
  <div class="h-screen w-screen flex flex-col bg-astra-white overflow-hidden">
    <!-- Top Bar - Full Width -->
    <TopBar />
    
    <!-- Main Layout Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Page Content -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Layout components will be auto-imported by Nuxt
</script>
