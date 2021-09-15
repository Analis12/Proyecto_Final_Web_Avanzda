//Dependences
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from "firebase-functions";
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gestion-veterinaria-72a0e.firebaseio.com",
    projectId:"gestion-veterinaria-72a0e"
});

//Controllers
const MascotaController = require("./controllers/MascotaController");
const UsuarioController = require("./controllers/UsuarioController");
const CitaController = require("./controllers/CitaController");
const ServicioController = require("./controllers/ServicioController");
const ProductoController = require("./controllers/ProductoController");
const ClienteController = require("./controllers/ClienteController");
const EncargadoController = require("./controllers/EncargadoController");
 // Express
const app = express();
app.use(cors({origin: true, methods: ['GET','POST','DELETE','PUT']}));
//Imports Routers
app.use("/mascotas",MascotaController);
app.use("/usuarios",UsuarioController);
app.use("/citas",CitaController);
app.use("/productos",ProductoController);
app.use("/servicios",ServicioController);
app.use("/clientes",ClienteController);
app.use("/encargados",EncargadoController);

app.use(bodyParser.json());
exports.api = functions.https.onRequest(app);



