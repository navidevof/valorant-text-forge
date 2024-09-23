<template>
	<div class="flex flex-col gap-4 aspect-square">
		<pre class="text-white text-sm">{{ renderArt }}</pre>
		<div class="flex flex-row gap-4">
			<button
				@click="localArtsStore.removeArt(art)"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconTrash class="size-5" />
				<Tooltip position="top" text="Borrar" />
			</button>
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
		</div>
	</div>
	<div></div>
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

interface Props {
	art: ILcalArt;
}

const { art } = defineProps<Props>();
const IS_COPY = ref(false);

const localArtsStore = useLocalArtsStore();
const boardStore = useBoardStore();

const { SELECTED_DATA } = storeToRefs(boardStore);

const renderArt = computed(() => addLineBreaks(art.textPlain, art.board.width));

const copyToClipboardText = async () => {
	await navigator.clipboard.writeText(art.textPlain);
	IS_COPY.value = true;

	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti();
	setTimeout(() => {
		IS_COPY.value = false;
	}, 3000);
};

const showInEditor = () => {
	SELECTED_DATA.value = art.data;
};
</script>
