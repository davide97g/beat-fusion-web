import {
  formatTime,
  getVariantForEnergy,
  getVariantForFlow,
} from "@/services/utils";
import { ISongInterval } from "../../../types/song.types";
import { Chip } from "@nextui-org/react";

export function Interval({
  interval,
}: Readonly<{
  interval: ISongInterval;
}>) {
  return (
    <div key={`interval-${interval.start}`} className="flex flex-col gap-4">
      <p>
        {formatTime(interval.start)} - {formatTime(interval.end)}
      </p>

      <p>
        Intensity: <span className="strong">{interval.intensity}</span>
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
  );
}
