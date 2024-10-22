export type FLOW_TYPE = "STABLE" | "CLIMAX" | "COOLDOWN" | "UNKNOWN";
export type ENERGY_TYPE = "HIGH" | "LOW" | "AVG";

export interface ISongInterval {
  start: number;
  end: number;
  intensity: number;
  energy: ENERGY_TYPE;
  flow_start: FLOW_TYPE;
  flow_end: FLOW_TYPE;
}

export interface ISong {
  id: string;
  name: string;
  storageURL: string;
}

export interface ISongAnalysis extends ISong {
  duration: number;
  tempo: number[];
  intervals: ISongInterval[];
}

export interface ISongStorage {
  songId: string;
  storageURL: string;
}
