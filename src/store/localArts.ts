import { ILcalArt } from "@/interfaces/art";
import { IBoardData } from "@/interfaces/board";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocalArtsStore = defineStore(
	"local-arts",
	() => {
		const MY_ARTS = ref<ILcalArt[]>([]);

		const isEqual = (artA: IBoardData[], artB: IBoardData[]) => {
			if (artA.length !== artB.length) return false;

			return artA.every((x) =>
				artB.some((y) => x.row === y.row && x.col === y.col)
			);
		};

		const addArt = (art: ILcalArt) => {
			MY_ARTS.value.push(art);
		};

		const removeArt = (art: ILcalArt) => {
			MY_ARTS.value = MY_ARTS.value.filter((x) => !isEqual(x.data, art.data));
		};

		const updateArt = (art: ILcalArt) => {
			const index = MY_ARTS.value.findIndex((x) => isEqual(x.data, art.data));
			MY_ARTS.value[index] = art;
		};

		return { MY_ARTS, addArt, updateArt, removeArt, isEqual };
	},
	{
		persist: true,
	}
);
