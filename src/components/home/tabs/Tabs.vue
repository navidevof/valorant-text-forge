<template>
	<aside class="flex flex-col gap-6 w-full mt-4">
		<div class="flex flex-col md:flex-row items-center w-full gap-x-4 gap-y-2">
			<button
				v-for="item in tabs"
				:key="item.id"
				class="text-center text-white transition w-11/12 mx-auto md:mx-0 md:w-auto duration-300 cursor-pointer"
				:class="{
					'bg-custom-red-3': tab.id !== item.id,
					'text-custom-red-1': tab.id === item.id,
					'bg-custom-red-1': tab.id === item.id,
				}"
				@click="tab = item"
			>
				{{ item.name }}
			</button>
		</div>
		<tab.component />
	</aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyArts from "./MyArts.vue";
import CommunityRecommendation from "./CommunityRecommendation.vue";

const tabs = [
	{
		id: "my-arts",
		name: "Mis Artes",
		component: MyArts,
	},
	{
		id: "recommendations",
		name: "Recomendaciones",
		component: CommunityRecommendation,
	},
];

const tab = ref(tabs[0]);
</script>
