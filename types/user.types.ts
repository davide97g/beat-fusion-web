import { IFusion } from "./fusion.types";
import { ISong } from "./song.types";

export interface BFUserRecap {
  id: string;
  email: string;
  username: string;
  photoURL: string;
}

export interface BFUser extends BFUserRecap {
  songs: ISong[];
  fusions: IFusion[];
  premium: boolean;
}
