import gamesService from "./games.service.js";

const gamesController = {};

gamesController.getGames = (req, res) => {
    const { status } = req.query;
    const games = gamesService.getGames(status);
    res.status(200).send({
        games: games
    });
}

gamesController.getGame = (req, res) => {
    const idGame = req.params.idGame;
    const game = gamesService.getGame(idGame);
    
    if (!game) {
        return res.status(404).send({ msg: "Game not found" });
    }

    res.status(200).send({
        game: game
    });
}

gamesController.addGame = (req, res) => {
    // 1. VALIDACIONES
    // 1.1 Validación de solicitud vacía
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ msg: "Bad Request: Request body is empty. Please provide: name, minPlayers, maxPlayers, duration (in minutes), acquisitionDate, status" });
    }

    const { name, minPlayers, maxPlayers, duration, acquisitionDate, status } = req.body;

    // 1.2. Validación de campos obligatorios
    if (!name || !minPlayers || !maxPlayers || !duration || !acquisitionDate || !status) {
        return res.status(400).send({ 
            msg: "Bad Request: All fields are required (name, minPlayers, maxPlayers, duration, acquisitionDate, status)" 
        });
    }

    // 1.3. Validación de lógica de jugadores
    if (Number(maxPlayers) < Number(minPlayers)) {
        return res.status(400).send({ msg: "Bad Request: maxPlayers must be >= minPlayers" });
    }

    // 1.4. Validación de formato de fecha (DD/MM/YYYY)
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
    if (!dateRegex.test(acquisitionDate)) {
        return res.status(400).send({ 
            msg: "Bad Request: Invalid date format. Use DD/MM/YYYY" 
        });
    }

    // 1.5. Validación de estado permitido
    const allowedStatus = [
        "en perfectas condiciones", 
        "ligeramente usado", 
        "deteriorado", 
        "dañado"
    ];

    const normalizedStatus = status ? status.toLowerCase().trim() : "";
    
    if (!allowedStatus.includes(normalizedStatus)) {
        return res.status(400).send({ 
            msg: `Bad Request: Invalid status. Must be one of: ${allowedStatus.join(", ")}` 
        });
    }

    const game = gamesService.addGame(name, minPlayers, maxPlayers, duration, acquisitionDate, normalizedStatus);

    res.status(201).send({
        msg: `Game ${game.name} successfully added`
    });
}

gamesController.updateGame = (req, res) => {
    const idGame = req.params.idGame;

    // 2.VALIDACIONES
    // 2.1. Validación de solicitud vacía
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ msg: "Bad Request: No data provided for update" });
    }

    const { minPlayers, maxPlayers, acquisitionDate, status } = req.body;
    let dataToUpdate = { ...req.body };

    // 2.2 Validación de lógica de jugadores 
    if (minPlayers !== undefined && maxPlayers !== undefined) {
        if (Number(maxPlayers) < Number(minPlayers)) {
            return res.status(400).send({ msg: "Bad Request: maxPlayers must be >= minPlayers" });
        }
    }

    // 2.3. Validación de formato de fecha
    if (acquisitionDate) {
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
        if (!dateRegex.test(acquisitionDate)) {
            return res.status(400).send({ msg: "Bad Request: Invalid date format. Use DD/MM/YYYY" });
        }
    }

    // 2.4. Validación de Status
    if (status) {
        const allowedStatus = [
            "en perfectas condiciones", 
            "ligeramente usado", 
            "deteriorado", 
            "dañado"
        ];
        
        const normalizedStatus = status.toLowerCase().trim();
        
        if (!allowedStatus.includes(normalizedStatus)) {
            return res.status(400).send({ 
                msg: `Bad Request: Invalid status. Must be one of: ${allowedStatus.join(", ")}` 
            });
        }

        dataToUpdate.status = normalizedStatus; 
    }

    const updatedGame = gamesService.updateGame(idGame, dataToUpdate);

    if (!updatedGame) {
        return res.status(404).send({ msg: "Game not found to update" });
    }

    res.status(200).send({
        msg: `Game ${updatedGame.name} updated successfully`
    });
};

gamesController.deleteGame = (req, res) => {
    const idGame = req.params.idGame;
    const deleted = gamesService.deleteGame(idGame);

    if (!deleted) {
        return res.status(404).send({ msg: "Game not found to delete" });
    }

    res.status(200).send({ msg: `Game with ID ${idGame} deleted` });
}

export default gamesController;