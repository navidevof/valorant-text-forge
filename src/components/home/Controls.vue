<template>
	<div class="flex justify-between md:flex-row flex-col gap-4 w-11/12 mx-auto">
		<label class="flex flex-col gap-2 min-w-56">
			<span>¿Cual es tu resolución?</span>
			<select
				v-model="RESOLUTION"
				@change="() => boardStore.updateBoard()"
				class="w-full"
			>
				<option selected value="full">Full HD</option>
				<option value="stretched">Stretched</option>
			</select>
		</label>
		<label for="rows" class="flex flex-row items-center gap-2">
			<span class="w-fit font-semibold">Filas:</span>
			<div class="w-full flex items-center flex-row justify-between gap-2">
				<span>1</span>
				<input
					type="range"
					class="w-full custom-range"
					name="rows"
					min="1"
					:title="`Fila actual: ${ROWS}`"
					:max="MAX_ROWS"
					:value="ROWS"
					@input="onInput"
				/>
				<span>{{ MAX_ROWS }}</span>
			</div>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { useBoardStore } from "@/store/board";
import { storeToRefs } from "pinia";

const boardStore = useBoardStore();
const { ROWS, MAX_ROWS, RESOLUTION } = storeToRefs(boardStore);

const onInput = (e: Event) => {
	if (!(e.target instanceof HTMLInputElement)) return;
	boardStore.updateBoard(Number(e.target.value));
};
</script>
