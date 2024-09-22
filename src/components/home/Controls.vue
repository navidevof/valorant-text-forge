<template>
	<div class="flex flex-col md:flex-row w-11/12 mx-auto gap-4 justify-between">
		<div class="flex flex-row gap-4 items-center">
			<button
				@click="$emit('copyText')"
				class="bg-custom-red-1 flex justify-center items-center gap-x-2"
			>
				<IconCopy class="size-5" />
				Copiar
			</button>
			<button
				@click="$emit('copyCode')"
				class="bg-custom-red-1 flex justify-center items-center gap-x-2"
			>
				<IconCopy class="size-5" />
				Copiar código
			</button>
		</div>
		<div class="flex flex-row gap-4">
			<button
				@click="$emit('invert')"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconSwitch class="size-5" />
				Invertir
			</button>
			<button
				@click="$emit('clear')"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconTrash class="size-5" />
				Borrar
			</button>
			<button
				@click="$emit('reset')"
				class="bg-custom-red-3 flex justify-center items-center gap-x-2"
			>
				<IconReload class="size-5" />
				Reiniciar
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSwitch from "@/components/icons/IconSwitch.vue";
import IconReload from "@/components/icons/IconReload.vue";
import IconCopy from "@/components/icons/IconCopy.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
</script>
