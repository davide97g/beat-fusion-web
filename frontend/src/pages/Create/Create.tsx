import { Loader } from "@/components/Loader";
import { SongAnalysis } from "@/components/SongAnalysis";
import { useSongCreateSongAnalysis } from "@/hooks/database/songs/useSongCreateSongAnalysis";
import { useEngineAnalyzeSong } from "@/hooks/engine/useEngineAnalyzeSong";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export function Create() {
  const {
    mutateAsync: analyzeSong,
    data: songAnalysis,
    isPending: isLoadingAnalysis,
  } = useEngineAnalyzeSong();

  const { mutateAsync: createAnalysis, isPending: isLoadingUpload } =
    useSongCreateSongAnalysis();
  const [song, setSong] = useState<File | null>(null);

  return (
    <div>
      <h1>Create</h1>
      {(isLoadingAnalysis || isLoadingUpload) && <Loader />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <input
            accept="mp3"
            placeholder="Song Name"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setSong(e.target.files[0]);
              }
            }}
          />
          <Button
            disabled={!song}
            onClick={() => {
              if (song) analyzeSong({ song });
            }}
          >
            Analyze Song
          </Button>
          {songAnalysis && (
            <Button
              color="primary"
              disabled={isLoadingUpload || isLoadingAnalysis}
              onClick={() =>
                createAnalysis({
                  songAnalysis,
                })
              }
            >
              Save
            </Button>
          )}
        </div>

        {songAnalysis && <SongAnalysis songAnalysis={songAnalysis} />}
      </div>
    </div>
  );
}
