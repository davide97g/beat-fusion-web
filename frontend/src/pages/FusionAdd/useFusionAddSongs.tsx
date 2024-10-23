import { formatFileName, formatTime } from "@/services/utils";
import { Copy, Launch, Play } from "@carbon/icons-react";
import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import { ISongAnalysis } from "../../../../types/song.types";

export const useFusionAddSongs = () => {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "duration",
      label: "DURATION",
    },
    {
      key: "tempo",
      label: "TEMPO",
    },
    {
      key: "play",
      label: "PLAY",
    },
  ];

  const renderCell = useCallback(
    (
      song: ISongAnalysis,
      columnKey: "id" | "name" | "tempo" | "duration" | "play",
    ) => {
      const cellValue = columnKey !== "play" ? song[columnKey] : "Play";

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-row gap-2 items-center">
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "16rem",
                }}
              >
                {cellValue}
              </p>
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  navigator.clipboard.writeText(cellValue as string);
                }}
              >
                <Copy />
              </Button>
            </div>
          );
        case "name":
          return formatFileName(cellValue as string);
        case "duration":
          return formatTime(cellValue as number);
        case "tempo":
          return (cellValue as unknown as number[])
            .map((t) => Math.round(t))
            .join(", ");
        case "play":
          return (
            <Button
              color="secondary"
              variant="light"
              onClick={() => {
                const audio = document.createElement("audio");
                audio.controls = true;
                audio.id = song.id;
                audio.src = song.storageURL;
                audio.play();
              }}
            >
              <Play />
            </Button>
          );
        default:
          return cellValue;
      }
    },
    [],
  );
  return { columns, renderCell };
};
