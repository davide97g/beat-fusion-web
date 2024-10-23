import { getToken } from "firebase/app-check";
import { ISongAnalysis } from "../../../types/song.types";
import { BFUser } from "../../../types/user.types";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { IFusionUser } from "../../../types/fusion.types";
import { appCheck, auth } from "../config/firebase";

const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:3000";

const ENGINE_URL =
  import.meta.env.VITE_APP_ENGINE_URL ?? "http://localhost:5000";

export const API = {
  getFusion: async ({ fusionId }: { fusionId: string }) => {
    return fetch(`${BACKEND_URL}/fusion/${fusionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (res as { fusion: IFusionUser }).fusion)
      .catch((err) => {
        console.info(err);
        return undefined;
      });
  },
  getServerStatus: async () => {
    return fetch(`${BACKEND_URL}/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => res.status as string)
      .catch((err) => {
        console.info(err);
        return "error";
      });
  },
};

export const API_AUTH = {
  getUser: async ({ userId }: { userId: string }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse || !idToken) return null;

    return fetch(`${BACKEND_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.user as BFUser)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  createUser: async ({ user }: { user: BFUser }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => res.user as BFUser)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  getFusions: async ({
    userId,
    dates,
  }: {
    userId?: string;
    dates?: string[];
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse || !idToken) return null;
    const query = new URL(`${BACKEND_URL}/fusions`);
    if (userId) query.searchParams.append("userId", userId);
    if (dates)
      dates.forEach((date) => query.searchParams.append("dates", date));

    return fetch(query.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.fusions as IFusionUser[])
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  createFusion: async ({ fusionUser }: { fusionUser: IFusionUser }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/fusion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(fusionUser),
    })
      .then((res) => res.json())
      .then((res) => res.fusion as IFusionUser)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  updateFusion: async ({ fusion }: { fusion: IFusionUser }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/fusion`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(fusion),
    })
      .then((res) => res.json())
      .then((res) => res.fusion as IFusionUser)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  deleteFusion: async ({ fusionId }: { fusionId: string }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/fusion/${fusionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.message as string)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  createSongAnalysis: async ({
    songAnalysis,
  }: {
    songAnalysis: ISongAnalysis;
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/song/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(songAnalysis),
    })
      .then((res) => res.json())
      .then((res) => res.songAnalysis as ISongAnalysis)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  analyzeSong: async ({ song }: { song: File }) => {
    const formData = new FormData();
    formData.append("song", song);
    return fetch(`${ENGINE_URL}/analyze`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (res) =>
          ({
            ...res,
            name: song.name,
          }) as ISongAnalysis,
      )
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  uploadSong: async ({ song, songId }: { song: File; songId: string }) => {
    if (!auth.currentUser?.uid) throw new Error("User not authenticated");
    const storage = getStorage();
    const reference = ref(storage, `${auth.currentUser.uid}/${songId}.mp3`);
    return uploadBytes(reference, song).then((snap) =>
      getDownloadURL(snap.ref),
    );
  },
  getSongs: async () => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      },
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse || !idToken) return null;
    const query = new URL(`${BACKEND_URL}/songs`);

    return fetch(query.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.songs as ISongAnalysis[])
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
};
