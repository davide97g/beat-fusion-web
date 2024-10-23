import { Loader } from "@/components/Loader";
import { useSongGetSongs } from "@/hooks/database/songs/useSongGetSongs";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";
import { ISongAnalysis } from "../../../../types/song.types";
import { Copy, Launch } from "@carbon/icons-react";
import { formatFileName, formatTime } from "@/services/utils";

export function Songs() {
  const { data: songs, isFetching } = useSongGetSongs();

  const columns = [
    {
      key: "id",
      label: "ID",
    },
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
      key: "storageURL",
      label: "URL",
    },
  ];

  const renderCell = useCallback(
    (
      song: ISongAnalysis,
      columnKey: "id" | "name" | "storageURL" | "tempo" | "duration",
    ) => {
      const cellValue = song[columnKey];

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
        case "storageURL":
          return (
            <Button
              color="secondary"
              variant="light"
              onClick={() => window.open(cellValue as string)}
            >
              Open <Launch />
            </Button>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <div className="flex flex-col max-w-80 justify-center items-center gap-4">
      <h1>Songs</h1>
      {isFetching && <Loader />}
      {songs && (
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={songs}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as any)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
