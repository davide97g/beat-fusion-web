import { getFirestore } from "firebase-admin/firestore";

import { IFusion } from "../../../../types/fusion.types";
import { ApiError, createApiError } from "../../types/error";

export const deleteFusion = async ({
  fusionId,
  userId,
}: Readonly<{ fusionId: string; userId: string }>) => {
  if (!fusionId) throw new Error("Delete Fusion: fusionId is required");

  const fusion = await getFusionById({ fusionId, userId });

  if (!fusion) throw new Error("Delete Fusion: fusion not found");

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
}>): Promise<IFusion | null> => {
  if (!fusionId) throw new Error("Get Fusion: fusionId is required");

  try {
    const db = getFirestore();
    const fusion = await db
      .collection("users")
      .doc(userId)
      .collection("fusions")
      .doc(fusionId)
      .get();

    return fusion.data() as IFusion;
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
  fusion,
  userId,
}: Readonly<{
  fusion: IFusion;
  userId: string;
}>): Promise<IFusion | ApiError> => {
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
    .doc(fusion.id)
    .set(fusion);

  return fusion;
};

export const updateFusion = async ({
  newFusion,
  userId,
}: Readonly<{
  newFusion: IFusion;
  userId: string;
}>): Promise<IFusion | null> => {
  if (!userId) throw new Error("Create Fusion: userId is required");

  const fusion = await getFusionById({ fusionId: newFusion.id, userId });

  if (!fusion) throw new Error("Create Fusion: fusion not found");
  if (newFusion.id !== fusion.id)
    throw new Error("Create Fusion: fusion id does not match");

  const db = getFirestore();

  await db
    .collection("users")
    .doc(userId)
    .collection("fusions")
    .doc(fusion.id)
    .set(newFusion);
  return fusion;
};
