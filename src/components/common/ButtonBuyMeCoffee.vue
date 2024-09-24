<script setup lang="ts">
import IconCoffee from "../icons/IconCoffee.vue";
</script>

<template>
	<a
		href="https://buymeacoffee.com/navidev"
		target="_blank"
		rel="noopener noreferrer"
		class="fixed md:relative bottom-3 md:bottom-0 md:right-0 flex z-50 hover:gap-x-1 items-center right-3 button-buy rounded-md px-4 py-2 animate-pulse hover:animate-none transition-all duration-300 outline-none bg-custom-red-1"
	>
		<IconCoffee class="size-6" />
		<span class="font-bold">Donar un cafe</span>
	</a>
</template>

<style scoped>
.button-buy span {
	max-width: 0;
	-webkit-transition: max-width 1s;
	transition: max-width 1s;
	display: inline-block;
	vertical-align: top;
	white-space: nowrap;
	overflow: hidden;
}
.button-buy:hover span {
	max-width: 20rem;
}
</style>
