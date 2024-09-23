import { IBoardData } from "./board";
import { TResolution } from "./resolution";

export interface ILcalArt {
	id: string;
	data: IBoardData[];
	textPlain: string;
	board: {
		resolution: TResolution;
		width: number;
		height: number;
	};
}
