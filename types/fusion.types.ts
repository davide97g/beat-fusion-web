import { ISongAnalysis } from "./song.types";

export interface IFusionInterval {
  songId: string;
  intervalPositionStart: number;
  intervalPositionEnd: number;
}

export interface IFusion {
  id: string; // UUID
  name: string;
  intervals: IFusionInterval[];
  songs: ISongAnalysis[];
}

export interface IFusionUser {
  id: string;
  name: string;
  intervals: IFusionInterval[];
}
