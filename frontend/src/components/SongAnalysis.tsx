import { Chip, Divider, ScrollShadow } from "@nextui-org/react";
import {
  ENERGY_TYPE,
  FLOW_TYPE,
  ISongAnalysis,
} from "../../../types/song.types";

function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}:${remainingSeconds}`;
}

function getVariantForEnergy(energy: ENERGY_TYPE) {
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

function getVariantForFlow(flow: FLOW_TYPE) {
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

export function SongAnalysis({
  songAnalysis,
}: Readonly<{ songAnalysis: ISongAnalysis }>) {
  return (
    <div className="flex flex-col">
      <h2>Analsys {songAnalysis.name}</h2>
      <div className="flex flex-row gap-4">
        <h3>Tempo</h3>
        <p>{songAnalysis.tempo}</p>
        <h3>Duration</h3>
        <p>{songAnalysis.duration}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Intervals</h3>
        <ScrollShadow
          className="w-[300px] h-[400px] flex flex-col gap-4"
          size={100}
          style={{ maxHeight: "500px" }}
        >
          {songAnalysis.intervals.map((interval) => (
            <>
              <div
                key={`interval-${interval.start}`}
                className="flex flex-col gap-4"
              >
                <p>
                  {convertSecondsToMinutes(interval.start)} -{" "}
                  {convertSecondsToMinutes(interval.end)}
                </p>

                <p>
                  Intensity:{" "}
                  <span className="strong">{interval.intensity}</span>
                </p>
                <p>
                  Energy:{" "}
                  <Chip color={getVariantForEnergy(interval.energy)}>
                    {interval.energy}
                  </Chip>
                </p>
                <p>
                  Flow Start:{" "}
                  <Chip color={getVariantForFlow(interval.flow_start)}>
                    {interval.flow_start}
                  </Chip>
                </p>
                <p>
                  Flow End:{" "}
                  <Chip color={getVariantForFlow(interval.flow_end)}>
                    {interval.flow_end}
                  </Chip>
                </p>
              </div>
              <Divider className="my-4" />
            </>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
}
