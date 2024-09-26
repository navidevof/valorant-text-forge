<template>
	<div class="flex flex-col gap-4">
		<div class="border bg-gray-900 rounded-md px-1 pt-1 relative">
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
				@click="toggleLike"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
				v-if="!LIKED_ARTS.includes(art.communityArtId)"
			>
				<IconHeartEmpty class="size-5" />
				<Tooltip position="top" text="Recomendar este arte ♥" />
			</button>
			<button
				@click="toggleLike"
				class="bg-custom-red-1 justify-center items-center gap-x-2 flex group relative z-10"
				v-else
			>
				<IconHeartFilled class="size-5" />
				<Tooltip position="top" text="Quitar recomendación 💔" />
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import JSConfetti from "js-confetti";

import { ICommunityArt } from "@/interfaces/art";
import { addLineBreaks } from "@/utils/addLineBreaks";
import { useUIStore } from "@/store/ui.store";
import { useBoardStore } from "@/store/board";
import { updateLikeArt } from "@/services/community";
import { MESSAGES } from "@/constants/messages";

import Tooltip from "@/components/common/Tooltip.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconCopyOf from "@/components/icons/IconCopyOf.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconHeartEmpty from "@/components/icons/IconHeartEmpty.vue";
import IconHeartFilled from "@/components/icons/IconHeartFilled.vue";
import { useArtsStore } from "@/store/arts";
import { useRouter } from "vue-router";

interface Props {
	art: ICommunityArt;
	goToBoard?: boolean;
}

const { art, goToBoard } = defineProps<Props>();
const router = useRouter();

const IS_COPY = ref(false);

const uiStore = useUIStore();
const boardStore = useBoardStore();
const artsStore = useArtsStore();

const { isLoading } = storeToRefs(uiStore);
const { SELECTED_DATA } = storeToRefs(boardStore);
const { RESOLUTION } = storeToRefs(boardStore);
const { LIKED_ARTS } = storeToRefs(artsStore);

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
	SELECTED_DATA.value = [...art.data];
	RESOLUTION.value = art.board.resolution;

	boardStore.updateBoard(art.board.height);

	if (goToBoard) router.push("/");
};

const toggleLike = async () => {
	try {
		isLoading.value = true;
		const isLiked = LIKED_ARTS.value.includes(art.communityArtId);
		const res = await updateLikeArt(
			art.communityArtId,
			isLiked ? "unlike" : "like"
		);
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		if (isLiked) {
			LIKED_ARTS.value = LIKED_ARTS.value.filter(
				(x) => x !== art.communityArtId
			);
		} else {
			LIKED_ARTS.value.push(art.communityArtId);
		}
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.defaultError);
	} finally {
		isLoading.value = false;
	}
};
</script>
