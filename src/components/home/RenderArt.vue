<template>
	<div class="flex flex-col gap-4 h-full">
		<div class="border bg-gray-900 rounded-md px-1 pt-1 relative">
			<button
				v-if="showDarg"
				class="absolute top-1 right-2 shadow-md drag p-1 bg-custom-red-2/90 rounded cursor-grab active:cursor-grabbing"
			>
				<IconDrag class="size-5" />
			</button>
			<pre class="text-white text-lg">{{ renderArt }}</pre>
		</div>
		<div class="flex flex-row justify-center gap-4 h-auto">
			<button
				@click="copyToClipboardText"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
				:class="{ 'opacity-50': IS_COPY, 'cursor-not-allowed': IS_COPY }"
				:disabled="IS_COPY"
			>
				<IconCopy v-show="!IS_COPY" class="size-5" />
				<IconCopyOf v-show="IS_COPY" class="size-5" />
				<Tooltip position="top" text="Copiar" />
			</button>
			<button
				@click="showInEditor"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconEye class="size-5" />
				<Tooltip position="top" text="Ver en el editor" />
			</button>
			<button
				@click="localArtsStore.removeArt(art)"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconTrash class="size-5" />
				<Tooltip position="top" text="Borrar" />
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useLocalArtsStore } from "@/store/localArts";
import { ILcalArt } from "@/interfaces/art";
import { addLineBreaks } from "@/utils/addLineBreaks";

import IconTrash from "@/components/icons/IconTrash.vue";
import Tooltip from "@/components/common/Tooltip.vue";
import IconCopy from "../icons/IconCopy.vue";
import JSConfetti from "js-confetti";
import IconCopyOf from "../icons/IconCopyOf.vue";
import IconEye from "../icons/IconEye.vue";
import { useBoardStore } from "../../store/board";
import { storeToRefs } from "pinia";
import { MESSAGES } from "@/constants/messages";
import IconDrag from "../icons/IconDrag.vue";

interface Props {
	art: ILcalArt;
	showDarg?: boolean;
}

const { art } = defineProps<Props>();
const IS_COPY = ref(false);

const localArtsStore = useLocalArtsStore();
const boardStore = useBoardStore();

const { SELECTED_DATA } = storeToRefs(boardStore);
const { RESOLUTION } = storeToRefs(boardStore);

const renderArt = computed(() => addLineBreaks(art.textPlain, art.board.width));

const copyToClipboardText = async () => {
	await navigator.clipboard.writeText(art.textPlain + MESSAGES.waterMark);
	IS_COPY.value = true;

	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
	setTimeout(() => {
		IS_COPY.value = false;
	}, 3000);
};

const showInEditor = () => {
	SELECTED_DATA.value = art.data;
	RESOLUTION.value = art.board.resolution;

	boardStore.updateBoard(art.board.height);
};
</script>
