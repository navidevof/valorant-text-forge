import { IBoardData } from "./board";

export interface ILcalArt {
	data: IBoardData[];
	textPlain: string;
	board: {
		width: number;
		height: number;
	};
}
