<template>
	<div class="flex flex-col md:flex-row w-11/12 mx-auto gap-4 justify-between">
		<div class="flex flex-row flex-wrap gap-4 items-center">
			<button
				@click="copyToClipboardText"
				class="bg-custom-red-1 flex justify-center items-center gap-x-2"
			>
				<IconCopy class="size-5" />
				Copiar
			</button>
			<button
				@click="copyToClipboardCode"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex"
			>
				<IconCopy class="size-5" />
				Copiar código
			</button>
			<button
				@click="showModalCode = true"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex"
			>
				<IconUpload class="size-5" />
				Cargar
			</button>
		</div>
		<div class="flex flex-row flex-wrap gap-4 items-center">
			<button
				@click="toggleInvert"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconSwitch class="size-5" />
				Invertir
			</button>
			<button
				@click="clearBoard"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconTrash class="size-5" />
				Borrar
			</button>
			<button
				@click="resetBoard"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconReload class="size-5" />
				Reiniciar
			</button>
		</div>
	</div>

	<ModalUploadCode v-if="showModalCode" @close="showModalCode = false" />
</template>

<script setup lang="ts">
import JSConfetti from "js-confetti";
import { generateAscii } from "@/utils/generateAscii";

import IconSwitch from "@/components/icons/IconSwitch.vue";
import IconReload from "@/components/icons/IconReload.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconUpload from "../icons/IconUpload.vue";
import { ref } from "vue";
import ModalUploadCode from "./ModalUploadCode.vue";
import { useBoardStore } from "@/store/board";
import { storeToRefs } from "pinia";

const boardStore = useBoardStore();
const { BOARD, SELECTED_DATA, IS_INVERTED, INITIAL_ROWS, ROWS, RESOLUTION } =
	storeToRefs(boardStore);

const showModalCode = ref(false);

const toggleInvert = () => (IS_INVERTED.value = !IS_INVERTED.value);

const resetBoard = () => {
	ROWS.value = INITIAL_ROWS.value;
	clearBoard();
	boardStore.updateBoard();
};

const clearBoard = () => (SELECTED_DATA.value = []);

const copyToClipboardText = async () => {
	const text = generateAscii({
		board: BOARD.value,
		selectedData: SELECTED_DATA.value,
		isInverted: IS_INVERTED.value,
	});
	await navigator.clipboard.writeText(text);
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
};

const copyToClipboardCode = async () => {
	await navigator.clipboard.writeText(
		JSON.stringify({
			resolution: RESOLUTION.value,
			data: SELECTED_DATA.value,
			rows: ROWS.value,
		})
	);
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
};
</script>
