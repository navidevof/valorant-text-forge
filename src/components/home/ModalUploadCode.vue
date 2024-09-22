<template>
  <aside class="bg-custom-black/80 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
    <div class="bg-custom-black border relative border-custom-white w-11/12 md:w-10/12 max-w-screen-sm mx-auto rounded-md p-4 flex flex-col gap-4">
      <button class="bg-custom-red-1 w-fit absolute top-3 right-3 !px-2" @click="$emit('close')">
        <IconX class="size-4" />
      </button>
      <h1 class="text-2xl font-bold">Cargar código</h1>
      <textarea
        class="w-full h-24 rounded-md p-2 border-custom-white border"
        placeholder="Código de valorant-text-forge"
        v-model="CODE"
        :autofocus="true"        
      ></textarea>
      <span v-show="ERROR" class="text-custom-red-1 -mt-3 text-sm">El codigo no es válido</span>
      <button @click="validateCode" class="bg-custom-red-1 rounded-md px-4 mx-auto py-2 hover">Cargar</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IconX from '../icons/IconX.vue';
  import { IBoardData } from '@/interfaces/board';

  const CODE = ref<string>('');
  const ERROR = ref<boolean>(false);
  
  const $emit = defineEmits(['close', 'loadData']);

  const validateCode = () => {
    try {
      ERROR.value = false;
      const NEW_SELECTED_DATA = JSON.parse(CODE.value) as IBoardData[];     

      $emit('loadData', NEW_SELECTED_DATA);
      $emit('close');
    } catch (e) {
      ERROR.value = true;
      setTimeout(() => {
        ERROR.value = false;
      }, 1500);
    }
  }
</script>
