<template>
	<div class="flex flex-col gap-6 w-full">
		<div
			v-if="RECOMMENDATIONS.length > 0"
			class="flex flex-wrap gap-x-4 gap-y-6 justify-center md:justify-start items-end overflow-hidden"
			ref="$myArts"
		>
			<RenderCommunityArt
				v-for="art in RECOMMENDATIONS"
				:key="art.communityArtId"
				:art="art"
			/>
		</div>
		<span v-else class="text-white text-sm -mt-3">
			Aún no has creado ningún arte :c
		</span>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useUIStore } from "@/store/ui.store";
import { ICommunityArt } from "@/interfaces/art";
import { getRecommendationsCommunityArts } from "@/services/community";
import { MESSAGES } from "@/constants/messages";

import RenderCommunityArt from "./RenderCommunityArt.vue";

const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);

const RECOMMENDATIONS = ref<ICommunityArt[]>([]);

const loadRecommendations = async () => {
	try {
		isLoading.value = true;
		const res = await getRecommendationsCommunityArts();
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		RECOMMENDATIONS.value = res.data;
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.defaultError);
	} finally {
		isLoading.value = false;
	}
};

onMounted(async () => {
	await loadRecommendations();
});
</script>
