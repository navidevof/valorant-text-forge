<template>
	<Header />
	<router-view></router-view>
	<ButtonBuyMeCoffee />
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import { inject } from "@vercel/analytics";
import ButtonBuyMeCoffee from "./components/common/ButtonBuyMeCoffee.vue";

inject();
</script>
