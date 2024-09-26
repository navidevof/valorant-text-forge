<template>
	<div class="flex flex-row flex-wrap w-11/12 mx-auto gap-4 justify-between">
		<div class="flex flex-row flex-wrap gap-4 items-center">
			<button
				@click="copyToClipboardText"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconCopy class="size-5" />
				<Tooltip position="top" text="Copiar" />
			</button>
			<button
				@click="copyToClipboardCode"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconDownload class="size-5" />
				<Tooltip position="top" text="Exportar código" />
			</button>
			<button
				@click="showModalCode = true"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconUpload class="size-5" />
				<Tooltip position="top" text="Importar código" />
			</button>
		</div>
		<div class="flex flex-row flex-wrap gap-4 items-center">
			<button
				@click="saveArt"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconSave class="size-5" />
				<Tooltip position="top" text="Guardar" />
			</button>
		</div>
		<div class="flex flex-row flex-wrap gap-4 items-center">
			<button
				@click="toggleInvert"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2 group relative z-10"
			>
				<IconSwitch class="size-5" />
				<Tooltip position="top" text="Invertir" />
			</button>
			<button
				@click="clearBoard"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2 group relative z-10"
			>
				<IconTrash class="size-5" />
				<Tooltip position="top" text="Borrar" />
			</button>
			<button
				@click="resetBoard"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2 group relative z-10"
			>
				<IconReload class="size-5" />
				<Tooltip position="top" text="Reiniciar" />
			</button>
		</div>
	</div>

	<ModalUploadCode v-if="showModalCode" @close="showModalCode = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import JSConfetti from "js-confetti";

import { useBoardStore } from "@/store/board";
import { useArtsStore } from "@/store/arts";
import { generateAscii } from "@/utils/generateAscii";
import IconSwitch from "@/components/icons/IconSwitch.vue";
import IconReload from "@/components/icons/IconReload.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconUpload from "../icons/IconUpload.vue";
import IconDownload from "../icons/IconDownload.vue";
import IconSave from "../icons/IconSave.vue";
import ModalUploadCode from "./ModalUploadCode.vue";
import Tooltip from "../common/Tooltip.vue";
import { MESSAGES } from "@/constants/messages";
import { ILocalArt } from "@/interfaces/art";

const boardStore = useBoardStore();
const artsStore = useArtsStore();

const {
	BOARD,
	SELECTED_DATA,
	IS_INVERTED,
	INITIAL_ROWS,
	ROWS,
	RESOLUTION,
	COLS,
} = storeToRefs(boardStore);
const { MY_ARTS } = storeToRefs(artsStore);

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
	await navigator.clipboard.writeText(text + MESSAGES.waterMark);
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
};

const copyToClipboardCode = async () => {
	await navigator.clipboard.writeText(
		JSON.stringify({
			resolution: RESOLUTION.value ?? "full",
			data: SELECTED_DATA.value,
			rows: ROWS.value,
		})
	);
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
};

const saveArt = () => {
	if (SELECTED_DATA.value.length === 0) return;

	const jsConfetti = new JSConfetti();

	const newArt: ILocalArt = {
		localArtId: self.crypto.randomUUID(),
		data: [...SELECTED_DATA.value],
		board: {
			width: COLS.value,
			height: ROWS.value,
			resolution: RESOLUTION.value ?? "full",
		},
		textPlain: generateAscii({
			board: BOARD.value,
			selectedData: SELECTED_DATA.value,
			isInverted: IS_INVERTED.value,
		}),
	};

	if (MY_ARTS.value.length === 0) {
		artsStore.addArt(newArt);
		jsConfetti.addConfetti();
		clearBoard();
		return;
	}

	const existArt = MY_ARTS.value.findIndex((art) =>
		artsStore.isEqual(art.data, newArt.data)
	);

	if (existArt >= 0) return;

	artsStore.addArt(newArt);
	jsConfetti.addConfetti();

	clearBoard();
};
</script>
