import { IBoardData } from "./board";
import { TResolution } from "./resolution";

export interface ILocalArt {
	localArtId: string;
	data: IBoardData[];
	textPlain: string;
	board: {
		resolution: TResolution;
		width: number;
		height: number;
	};
}

export interface ICommunityArt {
	communityArtId: string;
	data: IBoardData[];
	textPlain: string;
	board: {
		resolution: TResolution;
		width: number;
		height: number;
	};
	uid: string;
	likes: number;
}
