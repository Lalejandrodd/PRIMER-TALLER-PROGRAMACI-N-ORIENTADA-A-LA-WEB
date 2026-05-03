╔═════════════════════════════════════════════════════════════════╗
║        PRIMER TALLER DE PROGRAMACIÓN ORIENTADA A LA WEB -       ║
                API REST PARA JUEGOS DE MESA                      ║
╚═════════════════════════════════════════════════════════════════╝

API REST para gestionar una coleccion de juegos de mesa. Permite crear, consultar, actualizar y eliminar juegos

TECNOLOGÍAS USADAS
  Express
  Morgan
  Helmet
  CORS

CARACTERÍSTICAS TÉCNICAS
  Arquitectura modular
  Validaciones referentes a número de jugadores, cantidades no negativas, fechas futuras, formatos de fecha y estados permitidos (En perfectas condiciones, ligeramente usado, deteriorado o dañado)

CÓMO EJECUTAR EL PROYECTO
  1. Instalar las dependencias.
  2. Iniciar el servidor con: node src/index.js

El servidor corre en: http://localhost:3000

ENDPOINTS
  GET  /api/games  -> Obtiene el catálogo completo de juegos
  GET /api/games?status={estado} -> Obtiene los juegos filtrados por su estado de conservación
  GET /api/games/:idGame -> Obtiene la información detallada de un juego específico mediante su ID
  POST /api/games -> Registra un nuevo juego de mesa en la colección
  PUT /api/games/:idGame -> Actualiza los datos de un juego existente (permite edición parcial)
  DELETE /api/games/:idGame -> Retira definitivamente un juego del catálogo

ESTRUCTURA JSON DE UN JUEGO
{
  "id": 1,
  "name": "Monopoly",
  "minPlayers": 2,
  "maxPlayers": 4,
  "duration": 90,
  "acquisitionDate": "05/03/2008",
  "status": "en perfectas condiciones"
}

EJEMPLOS DE USO
Crear un juego (POST /api/games)

{
  "name": "Clue",
  "minPlayers": 2,
  "maxPlayers": 5,
  "duration": 60,
  "acquisitionDate": "12/12/2006",
  "status": "deteriorado"
}

Actualizar un juego (PUT /api/games/1)
{
  "status": "ligeramente usado",
  "duration": 75
}

Filtrar por estado (GET /api/games?status=deteriorado)

VALIDACIONES
  Todos los campos son obligatorios al crear
  minPlayers, maxPlayers y duration deben ser numeros positivos
  maxPlayers debe ser mayor o igual a minPlayers
  Fecha en formato DD/MM/YYYY
  La fecha no puede ser futura
  Estados permitidos:
    en perfectas condiciones
    ligeramente usado
    deteriorado
    dañado

ESTRUCTURA DEL PROYECTO
src/
├── app/
│   └── server.js
├── modules/
│   └── games/
│       ├── games.controller.js
│       ├── games.routes.js
│       └── games.service.js
├── routes/
│   └── index.routes.js
└── index.js

CÓDIGOS DE RESPUESTA
  200 | OK - Operacion exitosa
  201 | Created - Juego creado
  400 | Bad Request - Error en los datos
  404 | Not Found - Juego no encontrado

NOTA
  Los datos se almacenan en memoria. Al reiniciar el servidor, los datos se pierden.
