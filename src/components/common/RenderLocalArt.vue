<template>
	<div class="flex flex-col gap-4">
		<div class="border bg-gray-900 rounded-md px-1 pt-1 relative">
			<button
				class="absolute top-1 right-2 shadow-md md:block hidden drag p-1 bg-custom-red-2/90 rounded cursor-grab active:cursor-grabbing"
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
				v-if="!PUBLISH_ARTS.includes(art.localArtId)"
				@click="artsStore.removeArt(art)"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconTrash class="size-5" />
				<Tooltip position="top" text="Borrar" />
			</button>
			<button
				v-if="!PUBLISH_ARTS.includes(art.localArtId)"
				@click="publishToCommunity"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconSend class="size-5" />
				<Tooltip position="top" text="Compartir con la comunidad 🌐" />
			</button>
			<button
				v-else
				@click="unpublishMyArt"
				class="bg-custom-red-3 justify-center items-center gap-x-2 flex group relative z-10"
			>
				<IconSendOff class="size-5" />
				<Tooltip position="top" text="Remover de la comunidad" />
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import JSConfetti from "js-confetti";
import { auth } from "@/firebase";

import { useArtsStore } from "@/store/arts";
import { ICommunityArt, ILocalArt } from "@/interfaces/art";
import { addLineBreaks } from "@/utils/addLineBreaks";
import { useUIStore } from "@/store/ui.store";
import { useBoardStore } from "@/store/board";
import { publishArt, unpublishArt } from "@/services/community";
import { MESSAGES } from "@/constants/messages";

import IconTrash from "@/components/icons/IconTrash.vue";
import Tooltip from "@/components/common/Tooltip.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconCopyOf from "@/components/icons/IconCopyOf.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconDrag from "@/components/icons/IconDrag.vue";
import IconSend from "@/components/icons/IconSend.vue";
import IconSendOff from "@/components/icons/IconSendOff.vue";

interface Props {
	art: ILocalArt;
}

const { art } = defineProps<Props>();
const IS_COPY = ref(false);

const uiStore = useUIStore();
const artsStore = useArtsStore();
const boardStore = useBoardStore();

const { isLoading } = storeToRefs(uiStore);
const { SELECTED_DATA } = storeToRefs(boardStore);
const { RESOLUTION } = storeToRefs(boardStore);
const { PUBLISH_ARTS } = storeToRefs(artsStore);

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
};

const publishToCommunity = async () => {
	try {
		if (!auth.currentUser)
			return uiStore.showAlert("warning", "No has iniciado sesión.");

		const communityArt: ICommunityArt = {
			communityArtId: art.localArtId,
			data: art.data,
			textPlain: art.textPlain,
			board: {
				resolution: art.board.resolution,
				width: art.board.width,
				height: art.board.height,
			},
			uid: auth.currentUser.uid,
			likes: 0,
		};

		isLoading.value = true;
		const res = await publishArt(communityArt);
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		uiStore.showAlert("success", res.message);
		PUBLISH_ARTS.value.push(art.localArtId);
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.defaultError);
	} finally {
		isLoading.value = false;
	}
};

const unpublishMyArt = async () => {
	try {
		if (!auth.currentUser)
			return uiStore.showAlert("warning", "No has iniciado sesión.");

		isLoading.value = true;
		const res = await unpublishArt(art.localArtId);
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		uiStore.showAlert("success", res.message);
		PUBLISH_ARTS.value = PUBLISH_ARTS.value.filter((x) => x !== art.localArtId);
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.defaultError);
	} finally {
		isLoading.value = false;
	}
};
</script>
