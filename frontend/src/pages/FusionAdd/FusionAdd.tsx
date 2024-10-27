import { Loader } from "@/components/Loader";
import { useFusionCreateFusion } from "@/hooks/database/fusions";
import { useSongGetSongs } from "@/hooks/database/songs/useSongGetSongs";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFusionAddSongs } from "./useFusionAddSongs";
import { formatFileName, formatTime } from "@/services/utils";

export function FusionAdd() {
  const navigate = useNavigate();
  const { data: songs, isLoading: isLoadingSongs } = useSongGetSongs();

  const { mutateAsync: createFusion, isPending: isLoadingCreateFusion } =
    useFusionCreateFusion();

  const [fusionName, setFusionName] = useState<string>("");

  const [selectedSongIds, setSelectedSongIds] = useState<Set<string>>(
    new Set([]),
  );
  const [selectedIntervalIds, setSelectedIntervalIds] = useState<
    {
      songId: string;
      intervalPositionStart: number;
      intervalPositionEnd: number;
    }[]
  >([]);

  const selectedSongs = useMemo(() => {
    return songs?.filter((song) => selectedSongIds.has(song.id));
  }, [songs, selectedSongIds]);

  const selectedIntervals = useMemo(() => {
    return selectedSongs
      ?.map((song) => {
        return song.intervals.filter((_, index) =>
          selectedIntervalIds.some(
            (selectedInterval) =>
              selectedInterval.songId === song.id &&
              selectedInterval.intervalPositionStart >= index &&
              selectedInterval.intervalPositionEnd <= index,
          ),
        );
      })
      .flat();
  }, [selectedSongs, selectedIntervalIds]);

  const { columns: columnsSongs, renderCell: renderCellSongs } =
    useFusionAddSongs();

  const getIntervalTitle = (songId: string) => {
    const song = songs?.find((song) => song.id === songId);
    const selectedInterval = selectedIntervalIds.find(
      (id) => id.songId === songId,
    );
    return selectedInterval
      ? `${formatFileName(
          song?.name ?? "",
        )} - Interval: ${Number(selectedInterval.intervalPositionStart) + 1} - ${
          selectedInterval.intervalPositionEnd + 1
        }`
      : `${formatFileName(song?.name ?? "")} - Select an interval`;
  };

  return (
    <div>
      <h1 className="text-center">Create Fusion</h1>
      {(isLoadingSongs || isLoadingCreateFusion) && <Loader />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-end">
          <Input
            placeholder="Fusion name"
            value={fusionName}
            onChange={(e) => setFusionName(e.target.value)}
          />
          <Button
            color="primary"
            disabled={!selectedIntervals?.length || !fusionName}
            isDisabled={!selectedIntervals?.length || !fusionName}
            onClick={() => {
              createFusion({
                id: crypto.randomUUID(),
                name: fusionName,
                intervals: selectedIntervalIds,
              }).then(() => {
                navigate("/fusions");
              });
            }}
          >
            Save
          </Button>
        </div>
        <div className="flex flew-row gap-4">
          <div className="grow-1">
            <h3>Songs</h3>
            {songs && (
              <Table
                aria-label="Example table with dynamic content"
                selectedKeys={selectedSongIds}
                selectionBehavior="toggle"
                selectionMode="multiple"
                onSelectionChange={(selected) => {
                  if (selected === "all")
                    setSelectedSongIds(new Set(songs.map((song) => song.id)));
                  else setSelectedSongIds(selected as Set<string>);
                }}
              >
                <TableHeader columns={columnsSongs}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  items={songs.sort((sA, sB) => {
                    if (
                      selectedSongIds.has(sA.id) &&
                      !selectedSongIds.has(sB.id)
                    )
                      return -1;
                    if (
                      selectedSongIds.has(sB.id) &&
                      !selectedSongIds.has(sA.id)
                    )
                      return 1;
                    return 0;
                  })}
                >
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>
                          {renderCellSongs(item, columnKey as any)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="grow-1">
            <h3>Intervals</h3>
            <Accordion variant="shadow">
              {(selectedSongs ?? [])?.map((song) => (
                <AccordionItem
                  key={song.id}
                  aria-label={formatFileName(song.name)}
                  title={getIntervalTitle(song.id)}
                >
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col">
                      <Slider
                        showSteps
                        aria-label="Interval position"
                        defaultValue={[0, 0]}
                        maxValue={song.intervals.length - 1}
                        minValue={0}
                        orientation="vertical"
                        step={1}
                        value={(() => {
                          const interval = selectedIntervalIds.find(
                            (intervalId) => intervalId.songId === song.id,
                          );
                          if (interval) {
                            return [
                              song.intervals.length -
                                interval.intervalPositionStart -
                                1,
                              song.intervals.length -
                                interval.intervalPositionEnd -
                                1,
                            ];
                          }
                          return undefined;
                        })()}
                        onChange={(value) => {
                          setSelectedIntervalIds((prev) => {
                            const newSelectedIntervalIds = prev.filter(
                              (intervalId) => intervalId.songId !== song.id,
                            );
                            if (value !== undefined) {
                              const [end, start] = value as number[];
                              newSelectedIntervalIds.push({
                                songId: song.id,
                                intervalPositionStart:
                                  song.intervals.length - start - 1,
                                intervalPositionEnd:
                                  song.intervals.length - end - 1,
                              });
                            }
                            return newSelectedIntervalIds;
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      {song.intervals.map((interval, index) => (
                        <div
                          key={`${song.id}-${index}`}
                          className="flex flex-row gap-2 bold"
                        >
                          {formatTime(interval.start)} -{" "}
                          {formatTime(interval.end)} {interval.energy}{" "}
                          {interval.flow_start} - {interval.flow_end}
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
