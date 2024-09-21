<template>
  <div class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-md mx-auto">
    <div class="flex flex-row gap-4 w-11/12 mx-auto">
      <label for="rows">Filas:</label>
      <input type="range" class="w-full" name="rows" min="1" :max="MAX_ROWS" v-model="rows" @input="updateBoard" />
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
          :class="{
            'bg-gray-500': !SELECTED_DATA.find((d) => d.row === col.row && d.col === col.col),
            'bg-custom-white': SELECTED_DATA.find((d) => d.row === col.row && d.col === col.col),
          }"                
          @mousedown="startAction(col)"           
          @mouseenter="handleMouseOver(col)"
        ></button>
      </div>
    </div> 
    <div class="flex flex-row gap-4 justify-between">
      <button @click="copyyToClipboard" class="bg-custom-red-1">
        Copiar
      </button>
      <button @click="resetBoard" class="bg-gray-600">
        Resetear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBoardData } from "@/interfaces/board";
import { onMounted, ref, watch } from 'vue';
import { generateAscii } from '@/utils/generateAscii';

const COLS = 26;
const MAX_ROWS = 13; // Definimos el máximo de filas
const rows = ref(7); // Número de filas inicial
const BOARD = ref<IBoardData[][]>([]);
const SELECTED_DATA = ref<IBoardData[]>([]);

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
    const text = generateAscii({ board: BOARD.value, selectedData: SELECTED_DATA.value, isInverted: true });
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  updateBoard(); // Inicializa el tablero al montar el componente
});
</script>
