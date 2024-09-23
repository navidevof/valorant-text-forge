<template>
	<div class="flex flex-col gap-6">
		<h1 class="text-white text-2xl">Mis Artes</h1>
		<div v-if="MY_ARTS.length > 0" class="flex flex-wrap gap-4">
			<RenderArt v-for="art in MY_ARTS" :key="art.textPlain" :art="art" />
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

const localArtsStore = useLocalArtsStore();
const { MY_ARTS } = storeToRefs(localArtsStore);
</script>
