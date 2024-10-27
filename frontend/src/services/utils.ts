import { ENERGY_TYPE, FLOW_TYPE } from "../../../types/song.types";

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function formatFileName(name: string) {
  return name.replace(/.mp3/g, "");
}

export function getVariantForEnergy(energy: ENERGY_TYPE) {
  switch (energy) {
    case "LOW":
      return "danger";
    case "AVG":
      return "warning";
    case "HIGH":
      return "success";
    default:
      return "default";
  }
}

export function getVariantForFlow(flow: FLOW_TYPE) {
  switch (flow) {
    case "COOLDOWN":
      return "danger";
    case "UNKNOWN":
      return "warning";
    case "CLIMAX":
      return "success";
    default:
      return "default";
  }
}
