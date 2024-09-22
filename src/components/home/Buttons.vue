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
				@click="$emit('invert')"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconSwitch class="size-5" />
				Invertir
			</button>
			<button
				@click="$emit('clear')"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconTrash class="size-5" />
				Borrar
			</button>
			<button
				@click="$emit('reset')"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconReload class="size-5" />
				Reiniciar
			</button>
		</div>
	</div>

	<ModalUploadCode v-if="showModalCode" @close="showModalCode = false" @loadData="onLoadData" />
</template>

<script setup lang="ts">
import JSConfetti from "js-confetti";
import { IBoardData } from "@/interfaces/board";
import { generateAscii } from "@/utils/generateAscii";

import IconSwitch from "@/components/icons/IconSwitch.vue";
import IconReload from "@/components/icons/IconReload.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconUpload from "../icons/IconUpload.vue";
import { ref } from "vue";
import ModalUploadCode from "./ModalUploadCode.vue";


interface Props {
	BOARD: IBoardData[][];
	SELECTED_DATA: IBoardData[];	
	IS_INVERTED: boolean;
}

const { BOARD, SELECTED_DATA, IS_INVERTED } = defineProps<Props>();

const showModalCode = ref(false);

const $emit = defineEmits(['invert', 'clear', 'reset', 'setSelectedData']);

const onLoadData = (data: IBoardData[]) => {
	$emit('setSelectedData', data);
}

const copyToClipboardText = async () => {
	const text = generateAscii({
		board: BOARD,
		selectedData: SELECTED_DATA,
		isInverted: IS_INVERTED,
	});
	await navigator.clipboard.writeText(text);
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
};

const copyToClipboardCode = async () => {
	await navigator.clipboard.writeText(JSON.stringify(SELECTED_DATA));
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
};
</script>
