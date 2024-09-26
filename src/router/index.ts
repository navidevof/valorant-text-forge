import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/ValorantAsciiArt.vue"),
	},
	{
		path: "/comunidad",
		name: "community",
		component: () => import("@/views/CommunityArts.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
