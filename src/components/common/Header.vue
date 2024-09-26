<template>
	<header class="w-full mb-10 mx-auto border-b border-custom-white/50">
		<nav
			class="flex flex-row justify-between items-center gap-x-5 w-11/12 mx-auto max-w-screen-xl px-4 py-3"
		>
			<aside class="flex flex-row gap-0 md:gap-3 items-center">
				<router-link to="/">
					<img
						src="@/assets/logo.webp"
						alt="Logo Valorant Text Forge"
						class="h-12 w-auto"
					/>
				</router-link>
				<router-link to="/" class="text-lg md:text-2xl font-bold leading-5">
					<h1 class="md:inline">
						<span class="text-custom-red-1 md:inline block"> Valorant </span>
						Text Forge
					</h1>
					<sub
						class="text-custom-red-1 hidden md:inline md:w-auto w-full text-right"
					>
						By
						<a
							href="https://github.com/navidevof"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:underline transition duration-300"
							>Navidev✨</a
						>
					</sub>
				</router-link>
			</aside>
			<aside class="flex gap-3 items-center">
				<ButtonLoginGoogle />
				<ButtonBuyMeCoffee />
				<ButtonLogout />
			</aside>
		</nav>
	</header>
</template>

<script setup lang="ts">
import ButtonBuyMeCoffee from "./ButtonBuyMeCoffee.vue";
import ButtonLoginGoogle from "./ButtonLoginGoogle.vue";
import ButtonLogout from "./ButtonLogout.vue";
</script>
