import { Router } from 'express';

import gamesRoutes from '../modules/games/games.routes.js';

const indexRouter = Router()

// ROUTES
indexRouter.get("/", (req , res)  => {
    res.status(200).send({
        msg: "Running on index router"
    })
})

indexRouter.use("/games", gamesRoutes)

export default indexRouter;