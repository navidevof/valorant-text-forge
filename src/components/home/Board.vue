<template>
  <div
    class="w-full flex mx-auto flex-col gap-[2px]"
    @mousedown="startAction()"
    @mouseup="endAction"
    @mouseleave="endAction"
  >
    <div
      v-for="(row, rowIdx) in BOARD"
      :key="rowIdx"
      class="flex w-full gap-[2px]"
    >
      <button
        v-for="(col, colIdx) in row"
        :key="colIdx"
        class="size-full aspect-square cell transition duration-200 ease-out"
        :class="[
          SELECTED_DATA.find((d) => d.row === col.row && d.col === col.col)
            ? ACTIVE_COLOR
            : BG_COLOR,
        ]"
        @mousedown="startAction(col)"
        @mouseenter="handleMouseOver(col)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IBoardData } from '@/interfaces/board';
import { computed } from 'vue';

  interface Props {
    SELECTED_DATA: IBoardData[];
    BOARD: IBoardData[][];
    IS_INVERTED: boolean;
    startAction: (data?: IBoardData) => void;
    endAction: () => void;
    handleMouseOver: (data: IBoardData) => void;    
  }
  const { BOARD, SELECTED_DATA, IS_INVERTED } = defineProps<Props>();

  const ACTIVE_COLOR = computed(() =>
	IS_INVERTED ? "bg-gray-500" : "bg-custom-white"
);
const BG_COLOR = computed(() =>
	IS_INVERTED ? "bg-custom-white" : "bg-gray-500"
);
</script>