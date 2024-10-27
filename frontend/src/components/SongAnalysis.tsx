import { formatFileName } from "@/services/utils";
import { Divider, ScrollShadow } from "@nextui-org/react";
import { ISongAnalysis } from "../../../types/song.types";
import { Interval } from "./Interval";

export function SongAnalysis({
  songAnalysis,
}: Readonly<{ songAnalysis: ISongAnalysis }>) {
  return (
    <div className="flex flex-col">
      <h2>Analsys {formatFileName(songAnalysis.name)}</h2>
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
              <Interval interval={interval} />
              <Divider className="my-4" />
            </>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
}
