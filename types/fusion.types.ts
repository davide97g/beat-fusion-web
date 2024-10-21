import { ISongInterval, ISongRecap } from "./song.types";

export interface IFusion {
  id: string; // UUID
  name: string;
  configItems: ISongInterval[];
  songs: ISongRecap[];
}