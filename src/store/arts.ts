import { LOCAL_ARTS_INITIAL_DATA } from "@/constants/initialData";
import { ILocalArt } from "@/interfaces/art";
import { IBoardData } from "@/interfaces/board";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useArtsStore = defineStore(
	"local-arts",
	() => {
		const MY_ARTS = ref<ILocalArt[]>([...LOCAL_ARTS_INITIAL_DATA]);
		const PUBLISH_ARTS = ref<string[]>([]);
		const LIKED_ARTS = ref<string[]>([]);

		const isEqual = (artA: IBoardData[], artB: IBoardData[]) => {
			if (artA.length !== artB.length) return false;

			return artA.every((x) =>
				artB.some((y) => x.row === y.row && x.col === y.col)
			);
		};

		const addArt = (art: ILocalArt) => {
			MY_ARTS.value.push(art);
		};

		const removeArt = (art: ILocalArt) => {
			MY_ARTS.value = MY_ARTS.value.filter((x) => !isEqual(x.data, art.data));
		};

		const updateArt = (art: ILocalArt) => {
			const index = MY_ARTS.value.findIndex((x) => isEqual(x.data, art.data));
			MY_ARTS.value[index] = art;
		};

		return {
			MY_ARTS,
			addArt,
			updateArt,
			removeArt,
			isEqual,
			PUBLISH_ARTS,
			LIKED_ARTS,
		};
	},
	{
		persist: true,
	}
);
