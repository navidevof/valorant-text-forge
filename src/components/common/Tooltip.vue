<template>
	<span
		class="absolute left-1/2 translate-y-1/2 -translate-x-1/2 my-3 bg-gray-800 text-white text-xs font-semibold rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 shadow-lg whitespace-nowrap z-10 pointer-events-none"
		:class="position === 'top' ? 'bottom-full' : 'top-full'"
	>
		{{ text }}
		<span
			class="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45 pointer-events-none"
			:class="
				position === 'top'
					? 'top-full -translate-y-1/2'
					: 'bottom-full translate-y-1/2'
			"
		></span>
	</span>
</template>

<script setup lang="ts">
interface Props {
	text: string;
	position: "top" | "bottom";
}

defineProps<Props>();
</script>
