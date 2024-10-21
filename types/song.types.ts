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

export interface ISongRecap {
  id: string;
  name: string;
}

export interface ISong extends ISongRecap {
  duration: number;
  storageURL: string;
  tempo: number[];
  intervals: number[];
}
