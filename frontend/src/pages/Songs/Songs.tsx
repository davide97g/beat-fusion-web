import { Loader } from "@/components/Loader";
import { useSongGetSongs } from "@/hooks/database/songs/useSongGetSongs";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";
import { ISongAnalysis } from "../../../../types/song.types";

export function Songs() {
  const { data: songs, isFetching } = useSongGetSongs();
  // id: string;
  // name: string;
  // storageURL: string; duration: number;
  // tempo: number[];
  // intervals: ISongInterval[];

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
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "20rem",
              }}
            >
              {cellValue}
            </p>
          );
        case "name":
          return cellValue;
        case "duration":
          return cellValue;
        case "tempo":
          return (cellValue as unknown as string[]).join(", ");
        case "storageURL":
          return (
            <a href={cellValue as string} target="_blank" rel="noreferrer">
              <p
                className="text-blue-500"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "20rem",
                }}
              >
                {cellValue}
              </p>
            </a>
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
