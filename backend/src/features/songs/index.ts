import { getFirestore } from "firebase-admin/firestore";

import { ISongAnalysis } from "../../../../types/song.types";
import { ApiError, createApiError } from "../../types/error";

export const createSong = async ({
  songAnalysis,
  userId,
}: Readonly<{
  songAnalysis: ISongAnalysis;
  userId: string;
}>): Promise<ISongAnalysis | ApiError> => {
  if (!userId)
    return createApiError(
      "Create Song Analysis: userId is required",
      "create-song-analysis",
      400
    );

  const db = getFirestore();

  await db
    .collection("users")
    .doc(userId)
    .collection("songs")
    .doc(songAnalysis.id)
    .set(songAnalysis);

  return songAnalysis;
};

export const getSongs = async ({
  userId,
}: {
  userId: string;
}): Promise<ISongAnalysis[] | null> => {
  try {
    const db = getFirestore();
    const songs: ISongAnalysis[] = [];

    const querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("songs")
      .limit(20)
      .get();

    querySnapshot.forEach((doc) => {
      songs.push(doc.data() as ISongAnalysis);
    });

    return songs;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// deleteReport: async (game: RSU_Game): Promise<RSU_Game> => {
//   return updateDoc(doc(DB, COLLECTION, game.id), {
//     report: deleteField(),
//     reportFileURL: deleteField(),
//   }).then(() => game);
// },
// deleteReportFile: async ({
//   piva,
//   fileName,
// }: {
//   piva: string;
//   fileName: string;
// }): Promise<void> => {
//   const reference = ref(STORAGE, `${piva}/${fileName}.xlsx`);
//   return deleteObject(reference).catch((error) => {
//     console.info(error);
//     throw new Error("Error while deleting the report");
//   });
// },
