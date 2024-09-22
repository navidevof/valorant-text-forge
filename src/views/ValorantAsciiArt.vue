<template>
	<div class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-lg mx-auto">
		<Controls />
		<Board />
		<Buttons />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Board from "@/components/home/Board.vue";
import Buttons from "@/components/home/Buttons.vue";
import Controls from "@/components/home/Controls.vue";
import { useBoardStore } from "../store/board";

const boardStore = useBoardStore();

onMounted(() => {
	boardStore.updateBoard();
});
</script>
