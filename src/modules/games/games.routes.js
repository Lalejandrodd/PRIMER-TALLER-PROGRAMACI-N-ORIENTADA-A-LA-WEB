import { Router } from 'express';
import gamesController from './games.controller.js';

const gamesRoutes = Router();

gamesRoutes.get("/", gamesController.getGames);
gamesRoutes.get("/:idGame", gamesController.getGame);
gamesRoutes.post("/", gamesController.addGame);
gamesRoutes.put("/:idGame", gamesController.updateGame);
gamesRoutes.delete("/:idGame", gamesController.deleteGame);

export default gamesRoutes;