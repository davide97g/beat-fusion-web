import { Loader } from "@/components/Loader";
import { useFusionFindFusionById } from "@/hooks/database/fusions";
import { useFusionPlayer } from "@/hooks/useFusionPlayer";
import { Edit } from "@carbon/icons-react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";

export function Fusion() {
  const navigate = useNavigate();
  const { fusionId } = useParams<{ fusionId: string }>();
  const { data: fusion, isFetching: isLoading } = useFusionFindFusionById({
    id: fusionId,
  });

  const { playFusion, stop, isPlaying } = useFusionPlayer(
    fusion?.intervals.map((interval) => {
      const relatedSong = fusion.songs.find((s) => s.id === interval.songId)!;
      const songIntervalStart =
        relatedSong.intervals[interval.intervalPositionStart];
      const songIntervalEnd =
        relatedSong.intervals[interval.intervalPositionEnd];

      return {
        songId: interval.songId,
        start: songIntervalStart.start,
        end: songIntervalEnd.end,
      };
    }) || [],
  );

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <Loader />}
      <div className="flex flex-row justify-between items-center w-100">
        <h1>
          Fusion <code className="text-xs">ID: {fusion?.id}</code>
        </h1>
        <Button
          startContent={<Edit />}
          variant="light"
          onClick={() => navigate(`/fusion/edit/${fusionId}`)}
        >
          Edit
        </Button>
      </div>
      <div className="flex flex-row gap-4 space-between">
        <Input readOnly placeholder="Name" value={fusion?.name} />
        <div className="flex flex-row gap-4">
          <Button
            color="primary"
            disabled={isLoading || isPlaying}
            isDisabled={isLoading || isPlaying}
            variant="solid"
            onClick={playFusion}
          >
            Play
          </Button>
          <Button
            color="danger"
            disabled={isLoading || !isPlaying}
            isDisabled={isLoading || !isPlaying}
            variant="solid"
            onClick={stop}
          >
            Stop
          </Button>
        </div>
      </div>
      <h2>Intervals</h2>
      {fusion?.intervals.map((interval) => (
        <div
          key={
            interval.songId +
            "-" +
            interval.intervalPositionStart +
            "-" +
            interval.intervalPositionEnd
          }
        >
          {interval.songId} - {interval.intervalPositionStart} -{" "}
          {interval.intervalPositionEnd}
        </div>
      ))}
      <h2>Songs</h2>
      {fusion?.songs.map((song) => (
        <div key={song.id}>
          <p>{song.name}</p>
          <audio controls id={song.id}>
            <track kind="captions" />
            <source src={song.storageURL} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
}
