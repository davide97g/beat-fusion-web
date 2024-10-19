import express, { Express, Request, Response } from "express";
import { STReservation } from "../../../types/reservation.types";

import {
  createReservation,
  deleteReservation,
  getReservations,
  updateReservation,
} from "../features/reservations";
import { isLogged } from "../middleware/isLogged";
import { getUserInfoFromToken } from "../middleware/utils";
import { isApiError } from "../types/error";
import { createUser, getUserById } from "../features/user";

export const addLoggedRoutes = (app: Express) => {
  app.get("/reservations", [isLogged], async (req: Request, res: Response) => {
    const userId = req.query.userId as string | undefined;
    const dates = req.query.dates as string[] | undefined;
    const datesArray = dates
      ? Array.isArray(dates)
        ? dates
        : [dates]
      : undefined;

    const tokenInfo = await getUserInfoFromToken(req);
    if (!tokenInfo) {
      res.status(400).send({ message: "Error getting user info" });
      return;
    }

    if (userId && userId !== tokenInfo.uid) {
      res.status(403).send({ message: "Forbidden: user not authorized" });
      return;
    }

    const reservations = await getReservations({
      userId,
      dates: datesArray,
    });
    if (reservations === null) {
      res.status(404).send({ error: "Reservations not found" });
      return;
    }

    res.send({ reservations });
  });

  app.post(
    "/reservation",
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
        const reservation = await createReservation(
          body as STReservation,
          tokenInfo.uid
        );

        if (isApiError(reservation)) {
          res.status(reservation.status).send({ message: reservation.message });
          return;
        }

        res.send({ reservation });
      } catch (e: any) {
        res.status(403).send({ message: "Error creating reservation" });
        return;
      }
    }
  );

  app.put(
    "/reservation",
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
        const reservation = await updateReservation(
          body as STReservation,
          tokenInfo.uid
        );
        if (!reservation) {
          res.status(400).send({ message: "Error creating reservation" });
          return;
        }
        res.send({ reservation });
      } catch (e) {
        res.status(403).send({ message: e });
        return;
      }
    }
  );

  app.delete(
    "/reservation/:id",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ message: "Missing reservation ID" });
        return;
      }

      const tokenInfo = await getUserInfoFromToken(req);
      if (!tokenInfo) {
        res.status(400).send({ message: "Error getting user info" });
        return;
      }

      try {
        await deleteReservation(id, tokenInfo.uid);
        res.send({ message: "Reservation deleted" });
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

  return app;
};
