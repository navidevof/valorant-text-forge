<template>
	<main
		class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-lg mx-auto pb-16"
	>
		<Controls />
		<Board />
		<Buttons />
		<Tabs />
	</main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Board from "@/components/home/Board.vue";
import Buttons from "@/components/home/Buttons.vue";
import Controls from "@/components/home/Controls.vue";
import { useBoardStore } from "../store/board";
import Tabs from "@/components/home/tabs/Tabs.vue";

const boardStore = useBoardStore();

onMounted(() => {
	boardStore.updateBoard();
});
</script>
