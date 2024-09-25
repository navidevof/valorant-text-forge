<template>
	<aside
		class="h-screen w-full fixed top-0 left-0 z-50 bg-custom-black/80 grid place-items-center"
	>
		<div class="loader"></div>
	</aside>
</template>

<style>
.loader {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: block;
	margin: 15px auto;
	position: relative;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}
.loader::after,
.loader::before {
	content: "";
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: 0;
	background: #fd4556;
	width: 16px;
	height: 16px;
	transform: translate(-50%, 50%);
	border-radius: 50%;
}
.loader::before {
	left: auto;
	right: 0;
	background: #fffbf5;
	transform: translate(50%, 100%);
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
