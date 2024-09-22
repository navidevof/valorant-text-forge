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
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { IBoardData } from "@/interfaces/board";
import { useBoardStore } from "@/store/board";

const boardStore = useBoardStore();
const { BOARD, SELECTED_DATA, IS_INVERTED, IS_MOUSE_DOWN } =
	storeToRefs(boardStore);

const ACTIVE_COLOR = computed(() =>
	IS_INVERTED.value ? "bg-gray-500" : "bg-custom-white"
);
const BG_COLOR = computed(() =>
	IS_INVERTED.value ? "bg-custom-white" : "bg-gray-500"
);

const startAction = (data?: IBoardData) => {
	IS_MOUSE_DOWN.value = true;
	if (data) {
		boardStore.toggleSelected(data);
	}
};

const endAction = () => {
	IS_MOUSE_DOWN.value = false;
};

const handleMouseOver = (data: IBoardData) => {
	if (IS_MOUSE_DOWN.value) {
		boardStore.toggleSelected(data);
	}
};
</script>
