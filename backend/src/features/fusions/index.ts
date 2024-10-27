import { getFirestore } from "firebase-admin/firestore";

import { IFusion, IFusionUser } from "../../../../types/fusion.types";
import { ApiError, createApiError } from "../../types/error";
import { ISong, ISongAnalysis } from "../../../../types/song.types";

export const deleteFusion = async ({
  fusionId,
  userId,
}: Readonly<{ fusionId: string; userId: string }>) => {
  if (!fusionId) throw new Error("Delete Fusion: fusionId is required");

  // ! This is fetching all the songs => we just need the fusion
  // const fusion = await getFusionById({ fusionId, userId });

  // if (!fusion) throw new Error("Delete Fusion: fusion not found");

  const db = getFirestore();
  await db
    .collection("users")
    .doc(userId)
    .collection("fusions")
    .doc(fusionId)
    .delete();
};

export const getFusionById = async ({
  fusionId,
  userId,
}: Readonly<{
  fusionId: string;
  userId: string;
}>): Promise<IFusionUser | null> => {
  if (!fusionId) throw new Error("Get Fusion: fusionId is required");

  try {
    const db = getFirestore();
    const fusionResponse = await db
      .collection("users")
      .doc(userId)
      .collection("fusions")
      .doc(fusionId)
      .get();

    if (!fusionResponse.exists) return null;

    const fusion = fusionResponse.data() as IFusionUser;
    const fusionSongIdList = fusion.intervals.map((i) => i.songId);

    const fusionSongsResponse = await db
      .collection("users")
      .doc(userId)
      .collection("songs")
      .where("id", "in", fusionSongIdList)
      .get();

    const fullFusion: IFusion = {
      id: fusion.id,
      name: fusion.name,
      songs: fusionSongsResponse.docs.map((doc) => doc.data() as ISongAnalysis),
      intervals: fusion.intervals,
    };

    return fullFusion;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getFusions = async ({
  userId,
}: {
  userId: string;
}): Promise<IFusion[] | null> => {
  try {
    const db = getFirestore();
    const fusions: IFusion[] = [];

    const querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("fusions")
      .limit(20)
      .get();

    querySnapshot.forEach((doc) => {
      fusions.push(doc.data() as IFusion);
    });

    return fusions;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createFusion = async ({
  fusionUser,
  userId,
}: Readonly<{
  fusionUser: IFusionUser;
  userId: string;
}>): Promise<IFusionUser | ApiError> => {
  if (!userId)
    return createApiError(
      "Create Fusion: userId is required",
      "create-fusion",
      400
    );

  const db = getFirestore();

  await db
    .collection("users")
    .doc(userId)
    .collection("fusions")
    .doc(fusionUser.id)
    .set(fusionUser);

  return fusionUser;
};

export const updateFusion = async ({
  newFusion,
  userId,
}: Readonly<{
  newFusion: IFusionUser;
  userId: string;
}>): Promise<IFusionUser | null> => {
  if (!userId) throw new Error("Create Fusion: userId is required");

  // ! This is fetching all the songs => we just need the fusion
  // const fusion = await getFusionById({ fusionId: newFusion.id, userId });

  // if (!fusion) throw new Error("Create Fusion: fusion not found");
  // if (newFusion.id !== fusion.id)
  //   throw new Error("Create Fusion: fusion id does not match");

  const db = getFirestore();

  await db
    .collection("users")
    .doc(userId)
    .collection("fusions")
    .doc(newFusion.id)
    .set(newFusion);
  return newFusion;
};
