import * as admin from 'firebase-admin';
import { estaAutenticado } from "../middlewares/seguridad";
import { estaAutorizado } from "../middlewares/seguridad";
import { Servicio } from '../models/Servicio';
// Models
const db = admin.firestore();
const router = require("express").Router();
// Services

router.post("/registrar-servicio", estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }), async (req:any, res:any) => {
    let servicio:Servicio = req.body as Servicio;
    const newServicioRef = db.collection('servicios').doc();
    servicio.id = newServicioRef.id;
    newServicioRef.set(JSON.parse(JSON.stringify(servicio))).then(response => { // Servicio creado
            res.status(201).json({
                success: true,
                message: 'Registro de nuevo Servicio correctamente',
            })
        }).catch(e => { // error al crear Servicio
            res.status(400).json({
                success: false,
                message: 'Error en registro de nuevo Servicio'
            })
        });
   
});

router.put("/actualizar-servicio",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    let servicio:Servicio = req.body as Servicio;
    const updateuserRef =db.collection('servicios').doc(servicio.id);
        updateuserRef.update(JSON.parse(JSON.stringify(servicio)))
        .then(()=> { // Servicio actualizado
            res.status(200).json({
                success: true,
                message: 'Actualización de Servicio correctamente',
            })
        }).catch(() => { // error al actualizar Servicio
            res.status(400).json({
                success: false,
                message: 'Error en actualización de Servicio'
            })
        });
});
router.get("/listar-servicios",estaAutenticado,estaAutorizado({ hasRole: ['encargado','cliente'] }),async (req:any, res:any) => {
    const ref = db.collection("servicios");
    const doc = await ref.get();
    let servicioslist:Servicio[] =[];
    doc.docs.map(doc=>{
        let servicio = doc.data() as Servicio;
        servicioslist.push(servicio);
    });
    res.status(200).json({
        success: true,
        data: servicioslist
    });
});

router.get("/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado','cliente'] }),async (req:any, res:any) => {
    const ref = db.collection("servicios");
    const doc = await ref.get();
    doc.docs.map(doc=>{
        let servicio = doc.data() as Servicio;
        if(servicio.id==req.params.id){
            res.status(200).json({
                success: true,
                data: servicio
            });
        }
    });
    res.json({
        success: false,
        message: 'No existe ningún Servicio con el ID'+req.params.id
    });
    
});
router.delete("/eliminar-servicio/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    const ref = db.collection("servicios").doc(req.params.id);
    ref.delete().then(response => { // Servicio eliminado
        res.status(200).json({
            success: true,
            message: 'El Servicio ha sido eliminada definitivamente del sistema',
        })
    }).catch(e => { // error al eliminar el Servicio
        res.status(400).json({
            success: false,
            message: 'Error al eliminar el Servicio'
        })
    });
});

module.exports = router;
