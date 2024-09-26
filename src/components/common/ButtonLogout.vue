<template>
	<button
		v-if="auth.currentUser"
		@click="signOut"
		class="border border-custom-red-1 text-custom-red-1 flex items-center gap-x-2"
	>
		<IconLogout class="size-5" />
		<span class="text-white md:block hidden">Salir</span>
	</button>
</template>

<script setup lang="ts">
import { auth } from "@/firebase";
import IconLogout from "../icons/IconLogout.vue";

const signOut = async () => {
	await auth.signOut();

	window.location.reload();
};
</script>
