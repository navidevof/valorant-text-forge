<template>
	<div class="flex flex-col gap-6 w-full">
		<div
			v-if="MY_ARTS.length > 0"
			class="flex flex-wrap gap-x-4 gap-y-6 justify-center md:justify-start items-end overflow-hidden"
			ref="$myArts"
		>
			<RenderLocalArt v-for="art in MY_ARTS" :key="art.localArtId" :art="art" />
		</div>
		<pre
			v-else
			class="text-white text-[10px] sm:text-sm text-center mt-3 md:text-lg"
			>{{ emptyArt }}</pre
		>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Sortable from "sortablejs";
import { storeToRefs } from "pinia";

import { useArtsStore } from "@/store/arts";
import RenderLocalArt from "@/components/common/RenderLocalArt.vue";
import { getMyArts } from "@/services/community";
import { useUIStore } from "@/store/ui.store";
import { MESSAGES } from "@/constants/messages";
import { auth } from "@/firebase";
import { addLineBreaks } from "@/utils/addLineBreaks";

const uiStore = useUIStore();
const artsStore = useArtsStore();

const { isLoading } = storeToRefs(uiStore);
const { MY_ARTS, PUBLISH_ARTS } = storeToRefs(artsStore);

const $myArts = ref<HTMLDivElement | null>(null);

const emptyArt = addLineBreaks(
	"░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░█░█░░░█░░░██░░████░█████░████░████░░░█░█░░░░░█░░░░░░██░░█░░█░░█░█░░█░░░█░░░█░░░░█░░░░░░█░█░░░░░████░█░█░█░█░░████░████░░░█░░░███░░████░░░░░░░░░░░░░░█░█░█░░██░░█░░█░█░█░░░░█░░░█░░░░░░░█░░░███░░░░░████░█░█░░░█░░█░░█░█░░█░░░█░░░████░████░░█░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
	50
);

onMounted(async () => {
	if (!$myArts.value) return;

	Sortable.create($myArts.value, {
		handle: ".drag",
		ghostClass: "opacity-0",
		animation: 300,
		onEnd(evt) {
			const oldIndex = evt.oldIndex ?? 0;
			const newIndex = evt.newIndex ?? 0;

			if (oldIndex !== newIndex) {
				const movedItem = MY_ARTS.value.splice(oldIndex, 1)[0];
				MY_ARTS.value.splice(newIndex, 0, movedItem);
			}
		},
	});

	await loadMyArts();
});

const loadMyArts = async () => {
	try {
		if (!auth.currentUser) return;
		isLoading.value = true;
		const res = await getMyArts();
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		PUBLISH_ARTS.value = res.data;
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.defaultError);
	} finally {
		isLoading.value = false;
	}
};
</script>
