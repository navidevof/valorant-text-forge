<template>
  <div class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-lg mx-auto">
    <div class="flex flex-col w-11/12 mx-auto">
      <label for="rows" class="flex flex-row gap-2 ml-auto">
        <span class="w-fit font-semibold">Filas:</span>
        <div class="w-full flex flex-row justify-between gap-2">
          <span>1</span>
          <input type="range" class="w-full custom-range" name="rows" min="1" :title="`Fila actual: ${rows}`" :max="MAX_ROWS" v-model="rows" @input="updateBoard" />
          <span class="">{{ MAX_ROWS }}</span>
        </div>
      </label>
    </div>
    <div
      class="w-full flex mx-auto flex-col gap-[2px]"
      @mousedown="startAction()"
      @mouseup="endAction"
      @mouseleave="endAction"
    >
      <div v-for="(row, rowIdx) in BOARD" :key="rowIdx" class="flex w-full gap-[2px]">
        <button
          v-for="(col, colIdx) in row"
          :key="colIdx"
          class="size-full aspect-square cell transition duration-200 ease-out"
          :class="[
            SELECTED_DATA.find((d) => d.row === col.row && d.col === col.col) ? ACTIVE_COLOR : BG_COLOR,
          ]"                
          @mousedown="startAction(col)"           
          @mouseenter="handleMouseOver(col)"
        ></button>
      </div>
    </div> 
    <div class="flex w-11/12 mx-auto gap-4 justify-between">
      <div class="flex flexrow gap-4 items-center">        
        <button @click="copyyToClipboard" class="bg-custom-red-1 flex justify-center items-center gap-x-2">
          <IconCopy class="size-5" />
          Copiar
        </button>
      </div>
      <div class="flex flex-row gap-4">
        <button @click="IS_INVERTED = !IS_INVERTED" class="bg-custom-red-3 flex justify-center items-center gap-x-2">
          <IconSwitch class="size-5" />
          Invertir
        </button>
        <button @click="resetBoard" class="bg-custom-red-3 flex justify-center items-center gap-x-2">
          <IconReload class="size-5" />
          Reiniciar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBoardData } from "@/interfaces/board";
import { computed, onMounted, ref, watch } from 'vue';
import { generateAscii } from '@/utils/generateAscii';
import IconSwitch from "@/components/icons/IconSwitch.vue";
import IconReload from "@/components/icons/IconReload.vue";
import IconCopy from "@/components/icons/IconCopy.vue";

const COLS = 26;
const MAX_ROWS = 13; // Definimos el máximo de filas
const rows = ref(7); // Número de filas inicial
const BOARD = ref<IBoardData[][]>([]);
const SELECTED_DATA = ref<IBoardData[]>([]);
const IS_INVERTED = ref(false);

const ACTIVE_COLOR = computed(() => IS_INVERTED.value ? 'bg-gray-500' : 'bg-custom-white');
const BG_COLOR = computed(() => IS_INVERTED.value ? 'bg-custom-white' : 'bg-gray-500');

const createRow = (rowIdx: number): IBoardData[] => {
  return Array.from({ length: COLS }, (_, colIdx) => ({
    row: rowIdx,
    col: colIdx,
  }));
};

const updateBoard = () => {  
  if (rows.value > MAX_ROWS) {
    rows.value = MAX_ROWS;
  }

  BOARD.value = Array.from({ length: rows.value }, (_, rowIdx) => createRow(rowIdx));
};

const resetBoard = () => {    
  SELECTED_DATA.value = [];
};

watch(rows, () => {
  updateBoard();
});

let isMouseDown = false;

const startAction = (data?: IBoardData) => {
  isMouseDown = true;  
  if (data) {
    toggleSelected(data);
  }
};

const endAction = () => {
  isMouseDown = false;
};

const handleMouseOver = (data: IBoardData) => {
  if (isMouseDown) {
    toggleSelected(data);
  }
};

const toggleSelected = (data: IBoardData) => {
  const existingDataIndx = SELECTED_DATA.value.findIndex(d => d.row === data.row && d.col === data.col);

  if (existingDataIndx >= 0) {
    SELECTED_DATA.value.splice(existingDataIndx, 1);
  } else {
    SELECTED_DATA.value.push(data);
  }
};

const copyyToClipboard = async () => {
  try {
    const text = generateAscii({ board: BOARD.value, selectedData: SELECTED_DATA.value, isInverted: IS_INVERTED.value });
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  updateBoard(); // Inicializa el tablero al montar el componente
});
</script>
