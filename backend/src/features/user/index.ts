import { getFirestore } from "firebase-admin/firestore";
import { BFUser } from "../../../../types/user.types";

export const getUserById = async ({
  userId,
  tokenUserId,
}: {
  userId: string;
  tokenUserId: string;
}) => {
  if (!userId) throw new Error("Missing userId");
  if (!tokenUserId) throw new Error("Missing tokenUserId");
  if (userId !== tokenUserId) throw new Error("Unauthorized");

  const db = getFirestore();
  const userRef = db.collection("users").doc(userId);

  const user = await userRef.get();

  return user.data() as BFUser;
};

export const createUser = async ({ user }: { user: BFUser }) => {
  if (!user.id) throw new Error("Missing user uid");
  if (!user.email) throw new Error("Missing user email");

  const db = getFirestore();
  const userRef = db.collection("users").doc(user.id);

  return userRef.set(user);
};
