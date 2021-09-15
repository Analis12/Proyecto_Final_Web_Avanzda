import * as admin from 'firebase-admin';
import { estaAutenticado } from "../middlewares/seguridad";
import { estaAutorizado } from "../middlewares/seguridad";
import { Cita } from '../models/Cita';
// Models
const db = admin.firestore();
const router = require("express").Router();
// Services

router.post("/registrar-cita", estaAutenticado,estaAutorizado({ hasRole: ['cliente'] }), async (req:any, res:any) => {
    let cita:Cita = req.body as Cita;
    const newCitaRef = db.collection('citas').doc();
    cita.id = newCitaRef.id;
    newCitaRef.set(JSON.parse(JSON.stringify(cita))).then(response => { // Cita creada
            res.status(201).json({
                success: true,
                message: 'Registro de nueva cita correctamente',
            })
        }).catch(e => { // error al crear Cita
            res.status(400).json({
                success: false,
                message: 'Error en registro de nueva Cita'
            })
        });
   
});

router.put("/actualizar-cita",estaAutenticado,estaAutorizado({ hasRole: ['cliente','encargado'] }),async (req:any, res:any) => {
    let cita:Cita = req.body as Cita;
    const updateuserRef =db.collection('citas').doc(cita.id);
        updateuserRef.update(JSON.parse(JSON.stringify(cita)))
        .then(()=> { // Cita actualizada
            res.status(200).json({
                success: true,
                message: 'Actualización de cita correctamente',
            })
        }).catch(() => { // error al actualizar Cita
            res.status(400).json({
                success: false,
                message: 'Error en actualización de Cita'
            })
        });
});
router.get("/listar-citas-encargado/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    const ref = db.collection("citas");
    const doc = await ref.get();
    let citaslist:Cita[] =[];
    doc.docs.map(doc=>{
        let cita = doc.data() as Cita;
        if(cita.encargado_id == req.params.id){
            citaslist.push(cita);
        }
        
    });
    res.status(200).json({
        success: true,
        data: citaslist
    });
});
router.get("/listar-citas-cliente/:id",estaAutenticado,estaAutorizado({ hasRole: ['cliente'] }),async (req:any, res:any) => {
    const ref = db.collection("citas");
    const doc = await ref.get();
    let citaslist:Cita[] =[];
    doc.docs.map(doc=>{
        let cita = doc.data() as Cita;
        citaslist.push(cita);
        
    });
    res.status(200).json({
        success: true,
        data: citaslist,
    })
 
});


router.get("/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado','cliente'] }),async (req:any, res:any) => {
    const ref = db.collection("citas");
    const doc = await ref.get();
    doc.docs.map(doc=>{
        let cita = doc.data() as Cita;
        if(cita.id==req.params.id){
            res.status(200).json({
                success: true,
                data: cita
            });
        }
    });
    res.json({
        success: false,
        message: 'No existe ningún Cita con el ID'+req.params.id
    });
    
});
router.delete("/eliminar-cita/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado','cliente'] }),async (req:any, res:any) => {
    const ref = db.collection("citas").doc(req.params.id);
    ref.delete().then(response => { // Cita eliminado
        res.status(200).json({
            success: true,
            message: 'La cita ha sido eliminada definitivamente del sistema',
        })
    }).catch(e => { // error al eliminar la Cita
        res.status(400).json({
            success: false,
            message: 'Error al eliminar la Cita'
        })
    });
});


module.exports = router;
