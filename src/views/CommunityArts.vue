<template>
	<main
		class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-lg mx-auto pb-16"
	>
		<aside
			class="flex flex-wrap gap-x-4 gap-y-6 justify-center md:justify-start items-end overflow-hidden"
		>
			<RenderCommunityArt
				v-for="art in ARTS"
				:key="art.communityArtId"
				:art="art"
				go-to-board
			/>
		</aside>
		<button
			@click="loadArts"
			v-if="SHOW_MORE_BUTTON"
			class="flex items-center w-fit mx-auto gap-x-2 group bg-custom-red-3 text-white text-sm mt-3"
		>
			<IconRefresh class="size-5 group-hover:animate-spin transition" />
			Cargar más artes
		</button>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { ICommunityArt } from "@/interfaces/art";
import { useUIStore } from "@/store/ui.store";
import { getCommunityArts } from "@/services/community";
import { MESSAGES } from "@/constants/messages";

import RenderCommunityArt from "@/components/common/RenderCommunityArt.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";

const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);

const ARTS = ref<ICommunityArt[]>([]);
const LAST_ART = ref<string>("");
const SHOW_MORE_BUTTON = ref(false);

onMounted(async () => {
	await loadArts();
});

const loadArts = async () => {
	try {
		isLoading.value = true;
		const res = await getCommunityArts(LAST_ART.value);
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		SHOW_MORE_BUTTON.value = res.data.length === 6;
		LAST_ART.value = res.lasDoc;
		if (res.data.length === 0) return;
		ARTS.value.push(...res.data);
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.defaultError);
	} finally {
		isLoading.value = false;
	}
};
</script>
