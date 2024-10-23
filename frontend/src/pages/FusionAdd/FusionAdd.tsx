import { Loader } from "@/components/Loader";
import { useFusionCreateFusion } from "@/hooks/database/fusions";
import { useSongGetSongs } from "@/hooks/database/songs/useSongGetSongs";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Radio,
  RadioGroup,
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
    { songId: string; intervalPosition: string }[]
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
              selectedInterval.intervalPosition === `${index}`,
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
        )} - Interval: ${Number(selectedInterval.intervalPosition) + 1}`
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
            onClick={() => {
              createFusion({
                id: crypto.randomUUID(),
                name: fusionName,
                intervals: selectedIntervalIds.map((interval) => ({
                  songId: interval.songId,
                  intervalPosition: Number(interval.intervalPosition),
                })),
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
                selectionBehavior="toggle"
                selectionMode="multiple"
                onSelectionChange={(selected) =>
                  setSelectedSongIds(selected as Set<string>)
                }
              >
                <TableHeader columns={columnsSongs}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={songs}>
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
            <Accordion variant="splitted">
              {(selectedSongs ?? [])?.map((song) => (
                <AccordionItem
                  key={song.id}
                  aria-label={formatFileName(song.name)}
                  title={getIntervalTitle(song.id)}
                >
                  <RadioGroup
                    key={`${song.id}`}
                    label="Select the interval"
                    value={
                      selectedIntervalIds.find(
                        (intervalId) => intervalId.songId === song.id,
                      )?.intervalPosition
                    }
                    onValueChange={(value) => {
                      setSelectedIntervalIds((prev) => {
                        const newSelectedIntervalIds = prev.filter(
                          (intervalId) => intervalId.songId !== song.id,
                        );
                        if (value !== undefined) {
                          newSelectedIntervalIds.push({
                            songId: song.id,
                            intervalPosition: value,
                          });
                        }
                        return newSelectedIntervalIds;
                      });
                    }}
                  >
                    {song.intervals.map((interval, index) => (
                      <Radio key={`${song.id}-${index}`} value={`${index}`}>
                        {formatTime(interval.start)} -{" "}
                        {formatTime(interval.end)} {interval.energy}{" "}
                        {interval.flow_start} - {interval.flow_end}
                      </Radio>
                    ))}
                  </RadioGroup>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
