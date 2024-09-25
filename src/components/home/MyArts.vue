<template>
	<div class="flex flex-col gap-6 w-full mx-auto">
		<h1 class="text-white text-2xl">Mis Artes</h1>
		<div
			v-if="MY_ARTS.length > 0"
			class="flex flex-wrap gap-4 items-end"
			ref="$myArts"
		>
			<RenderArt v-for="art in MY_ARTS" :key="art.id" :art="art" show-darg />
		</div>
		<span v-else class="text-white text-sm -mt-3">
			Aún no has creado ningún arte :c
		</span>
	</div>
</template>

<script lang="ts" setup>
import { useLocalArtsStore } from "@/store/localArts";
import { storeToRefs } from "pinia";
import RenderArt from "./RenderArt.vue";
import { onMounted, ref } from "vue";
import Sortable from "sortablejs";

// Accedemos a la tienda
const localArtsStore = useLocalArtsStore();
const { MY_ARTS } = storeToRefs(localArtsStore);

const $myArts = ref<HTMLDivElement | null>(null);

onMounted(() => {
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
});
</script>
