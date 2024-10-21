import express, { Express, Request, Response } from "express";

import { IFusion } from "../../../types/fusion.types";
import {
  createFusion,
  deleteFusion,
  getFusionById,
  getFusions,
  updateFusion,
} from "../features/fusions";
import { createUser, getUserById } from "../features/user";
import { isLogged } from "../middleware/isLogged";
import { getUserInfoFromToken } from "../middleware/utils";
import { isApiError } from "../types/error";
import { ISongAnalysis } from "../../../types/song.types";
import { createSong } from "../features/songs";

export const addLoggedRoutes = (app: Express) => {
  app.get("/fusions", [isLogged], async (req: Request, res: Response) => {
    const tokenInfo = await getUserInfoFromToken(req);
    if (!tokenInfo) {
      res.status(400).send({ message: "Error getting user info" });
      return;
    }

    if (!tokenInfo.uid) {
      res.status(400).send({ message: "Missing user ID" });
      return;
    }

    const fusions = await getFusions({
      userId: tokenInfo.uid,
    });

    if (fusions === null) {
      res.status(404).send({ error: "Fusions not found" });
      return;
    }

    res.send({ fusions });
  });

  app.post(
    "/fusion",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { body } = req;

      const tokenInfo = await getUserInfoFromToken(req);
      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      try {
        const fusion = await createFusion({
          fusion: body as IFusion,
          userId: tokenInfo.uid,
        });

        if (isApiError(fusion)) {
          res.status(fusion.status).send({ message: fusion.message });
          return;
        }

        res.send({ fusion });
      } catch (e: any) {
        res.status(403).send({ message: "Error creating fusion" });
        return;
      }
    }
  );

  app.post(
    "/song/analysis",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { body } = req;

      const tokenInfo = await getUserInfoFromToken(req);
      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      try {
        const songAnalysis = await createSong({
          songAnalysis: body as ISongAnalysis,
          userId: tokenInfo.uid,
        });

        if (isApiError(songAnalysis)) {
          res
            .status(songAnalysis.status)
            .send({ message: songAnalysis.message });
          return;
        }

        res.send({ songAnalysis });
      } catch (e: any) {
        res.status(403).send({ message: "Error creating fusion" });
        return;
      }
    }
  );

  app.put(
    "/fusion",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { body } = req;
      const tokenInfo = await getUserInfoFromToken(req);

      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      try {
        const fusion = await updateFusion({
          newFusion: body as IFusion,
          userId: tokenInfo.uid,
        });
        if (!fusion) {
          res.status(400).send({ message: "Error creating fusion" });
          return;
        }
        res.send({ fusion });
      } catch (e) {
        res.status(403).send({ message: e });
        return;
      }
    }
  );

  app.delete(
    "/fusion/:id",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ message: "Missing fusion ID" });
        return;
      }

      const tokenInfo = await getUserInfoFromToken(req);
      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      try {
        await deleteFusion({ fusionId: id, userId: tokenInfo.uid });
        res.send({ message: "Fusion deleted" });
      } catch (e) {
        res.status(403).send({ message: e });
        return;
      }
    }
  );

  app.get("/user/:id", [isLogged], async (req: Request, res: Response) => {
    const requestedUserId = req.params.id;
    const tokenInfo = await getUserInfoFromToken(req);
    if (!tokenInfo) {
      res.status(400).send({ message: "Error getting user info" });
      return;
    }
    if (tokenInfo.uid !== requestedUserId) {
      res.status(403).send({ message: "Forbidden: user not authorized" });
      return;
    }

    try {
      const user = await getUserById({
        userId: requestedUserId,
        tokenUserId: tokenInfo.uid,
      });
      res.send({ user });
    } catch (e) {
      if (isApiError(e)) res.status(e.status).send({ message: e.message });
      else res.status(403).send({ message: e });

      return;
    }
  });

  app.post(
    "/user",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const tokenInfo = await getUserInfoFromToken(req);
      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      if (!req.body) {
        res.status(400).send({ message: "Missing user data" });
        return;
      }

      if (req.body.id !== tokenInfo.uid) {
        res.status(403).send({ message: "Forbidden: user not authorized" });
        return;
      }

      try {
        const user = await createUser({
          user: req.body,
        });
        res.send({ user });
      } catch (e) {
        res.status(403).send({ message: e });
        return;
      }
    }
  );

  app.get(
    "/fusion/:id",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const fusionId = req.params.id;

      const tokenInfo = await getUserInfoFromToken(req);
      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      const fusion = await getFusionById({ fusionId, userId: tokenInfo.uid });
      if (fusion === null) {
        res.status(404).send({ error: "Fusion not found" });
        return;
      }
      res.send({ fusion });
    }
  );

  return app;
};
