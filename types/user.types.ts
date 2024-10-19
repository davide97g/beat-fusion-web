export interface BFUserRecap {
  id: string;
  email: string;
  username: string;
  photoURL: string;
}
export interface BFUser extends BFUserRecap {
  songs: string[];
  mixes: string[];
}
