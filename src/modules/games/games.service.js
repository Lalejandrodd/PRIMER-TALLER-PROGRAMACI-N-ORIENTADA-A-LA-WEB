const gamesService = {};

let games = [];
let counterID = 1;

gamesService.getGames = (statusFilter) => {
    if (statusFilter) {
        let filteredGames = [];
        for (let game of games) {
            if (game.status.toLowerCase() === statusFilter.toLowerCase()) {
                filteredGames.push(game);
            }
        }
        return filteredGames;
    }
    return games;
}

gamesService.getGame = (id) => {
    for (let game of games) {
        if (game.id == id) return game;
    }
    return null;
}

gamesService.addGame = (name, minPlayers, maxPlayers, duration, acquisitionDate, status) => { 
    const newGame = {
        id: counterID,
        name: name,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        duration: duration,
        acquisitionDate: acquisitionDate,
        status: status
    };
    counterID++;
    games.push(newGame);
    return newGame;
}

gamesService.updateGame = (id, dataToUpdate) => {
    for (let i = 0; i < games.length; i++) {
        if (games[i].id == id) {
            games[i] = { ...games[i], ...dataToUpdate, id: Number(id) };
            return games[i];
        }
    }
    return null;
}

gamesService.deleteGame = (id) => {
    for (let i = 0; i < games.length; i++) {
        if (games[i].id == id) {
            games.splice(i, 1);
            return true;
        }
    }
    return false;
}

export default gamesService;