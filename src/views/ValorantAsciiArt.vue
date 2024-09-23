<template>
	<div
		class="flex flex-col gap-4 w-11/12 md:w-10/12 max-w-screen-lg mx-auto pb-10"
	>
		<Controls />
		<Board />
		<Buttons />
		<MyArts />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Board from "@/components/home/Board.vue";
import Buttons from "@/components/home/Buttons.vue";
import Controls from "@/components/home/Controls.vue";
import { useBoardStore } from "../store/board";
import MyArts from "@/components/home/MyArts.vue";

const boardStore = useBoardStore();

onMounted(() => {
	boardStore.updateBoard();
});
</script>
