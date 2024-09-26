<template>
	<button
		@click="singInWithGoogle"
		class="border border-custom-white flex items-center gap-x-2"
		v-if="!auth.currentUser"
	>
		<IconGoogle class="size-5" />
		<span class="md:block hidden">Ingresar</span>
	</button>
</template>

<script setup lang="ts">
import IconGoogle from "@/components/icons/IconGoogle.vue";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const singInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;

		if (token) {
			window.location.reload();
		}
	} catch (error) {
		console.log({ error });
	}
};
</script>
