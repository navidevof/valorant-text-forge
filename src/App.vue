<template>
  <main class="flex flex-col w-full pb-10">
    <Header />    
    <Board />    
  </main>
</template>

<script setup lang="ts">
  import Board from '@/components/home/Board.vue';  
  import Header from '@/components/common/Header.vue';
</script>