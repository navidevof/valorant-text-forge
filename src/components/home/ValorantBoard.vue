<template>
	<div class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-lg mx-auto">
		<Controls :ROWS="ROWS" :MAX_ROWS="MAX_ROWS" :updateBoard="updateBoard" @changeResolution="chabgeResolution" />
		<Board 
			:BOARD="BOARD" 
			:SELECTED_DATA="SELECTED_DATA" 
			:IS_INVERTED="IS_INVERTED" 
			:startAction="startAction" 
			:endAction="endAction" 
			:handleMouseOver="handleMouseOver" 
		/>
		<Buttons
			:BOARD="BOARD"
			:SELECTED_DATA="SELECTED_DATA"
			:IS_INVERTED="IS_INVERTED"
			@invert="toggleInvert"
			@clear="clearBoard"
			@reset="resetBoard"		
			@setSelectedData="(data) => {SELECTED_DATA = data}"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { IBoardData } from "@/interfaces/board";
import Board from "./Board.vue";
import Buttons from "./Buttons.vue";
import Controls from "./Controls.vue";

const RESOLUTION = ref<'stretched' | 'full'>('full');
const COLS = computed(() => RESOLUTION.value === 'full' ? 26 : 27);
const MAX_ROWS = 13;
const INITIAL_ROWS = 7;
const ROWS = ref(INITIAL_ROWS);
const BOARD = ref<IBoardData[][]>([]);
const SELECTED_DATA = ref<IBoardData[]>([]);
const IS_INVERTED = ref(false);
let isMouseDown = false;

const createRow = (rowIdx: number): IBoardData[] => {
	return Array.from({ length: COLS.value }, (_, colIdx) => ({
		row: rowIdx,
		col: colIdx,
	}));
};

const updateBoard = (value?: number) => {	
	ROWS.value = value ?? INITIAL_ROWS;

	if (ROWS.value > MAX_ROWS) {
		ROWS.value = MAX_ROWS;
	}

	BOARD.value = Array.from({ length: ROWS.value }, (_, rowIdx) =>
		createRow(rowIdx)
	);
};

const resetBoard = () => {
	ROWS.value = INITIAL_ROWS;
	clearBoard();
	updateBoard();
};

const clearBoard = () => (SELECTED_DATA.value = []);

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
	const existingDataIndx = SELECTED_DATA.value.findIndex(
		(d) => d.row === data.row && d.col === data.col
	);

	if (existingDataIndx >= 0) {
		SELECTED_DATA.value.splice(existingDataIndx, 1);
	} else {
		SELECTED_DATA.value.push(data);
	}
};

const toggleInvert = () => (IS_INVERTED.value = !IS_INVERTED.value);

const chabgeResolution = (value: 'full' | 'stretched') => {
	RESOLUTION.value = value;
	updateBoard();
}

onMounted(() => {
	updateBoard();
});
</script>
