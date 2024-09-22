import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { IBoardData } from "@/interfaces/board";
import { TResolution } from "@/interfaces/resolution";

export const useBoardStore = defineStore("board", () => {
	const RESOLUTION = ref<TResolution>("full");
	const COLS = computed(() => (RESOLUTION.value === "full" ? 26 : 27));
	const MAX_ROWS = ref(13);
	const INITIAL_ROWS = ref(7);
	const ROWS = ref(INITIAL_ROWS.value);
	const BOARD = ref<IBoardData[][]>([]);
	const SELECTED_DATA = ref<IBoardData[]>([]);
	const IS_INVERTED = ref(false);
	const IS_MOUSE_DOWN = ref(false);

	const createRow = (rowIdx: number): IBoardData[] => {
		return Array.from({ length: COLS.value }, (_, colIdx) => ({
			row: rowIdx,
			col: colIdx,
		}));
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

	const updateBoard = (value?: number) => {
		ROWS.value = value ?? INITIAL_ROWS.value;

		if (ROWS.value > MAX_ROWS.value) {
			ROWS.value = MAX_ROWS.value;
		}

		BOARD.value = Array.from({ length: ROWS.value }, (_, rowIdx) =>
			createRow(rowIdx)
		);
	};

	return {
		RESOLUTION,
		COLS,
		MAX_ROWS,
		INITIAL_ROWS,
		ROWS,
		BOARD,
		SELECTED_DATA,
		IS_INVERTED,
		IS_MOUSE_DOWN,

		updateBoard,
		toggleSelected,
	};
});
