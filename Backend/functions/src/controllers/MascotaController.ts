import * as admin from 'firebase-admin';
import { estaAutenticado } from "../middlewares/seguridad";
import { estaAutorizado } from "../middlewares/seguridad";
import { Mascota } from '../models/Mascota';
// Models
const db = admin.firestore();
const router = require("express").Router();
// Services

router.post("/registrar-mascota", estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }), async (req:any, res:any) => {
    let mascota:Mascota = req.body as Mascota;
    const newMascotaRef = db.collection('mascotas').doc();
    mascota.id = newMascotaRef.id;
    newMascotaRef.set(JSON.parse(JSON.stringify(mascota))).then(response => { // Mascota creada
            res.status(201).json({
                success: true,
                message: 'Registro de nueva Mascota correctamente',
            })
        }).catch(e => { // error al crear Mascota
            res.status(400).json({
                success: false,
                message: 'Error en registro de nueva Mascota'
            })
        });
   
});

router.put("/actualizar-mascota",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    let mascota:Mascota = req.body as Mascota;
    const updateuserRef =db.collection('Mascotas').doc(mascota.id);
        updateuserRef.update(JSON.parse(JSON.stringify(mascota)))
        .then(()=> { // Mascota actualizada
            res.status(200).json({
                success: true,
                message: 'Actualización de Mascota correctamente',
            })
        }).catch(() => { // error al actualizar Mascota
            res.status(400).json({
                success: false,
                message: 'Error en actualización de Mascota'
            })
        });
});
router.get("/listar-mascotas",async (req:any, res:any) => {
    const ref = db.collection("mascotas");
    const doc = await ref.get();
    let mascotaslist:Mascota[] =[];
    doc.docs.map(doc=>{
        let mascota = doc.data() as Mascota;
        mascotaslist.push(mascota);
    });
    res.status(200).json({
        success: true,
        data: mascotaslist
    });
});

router.get("/:id",async (req:any, res:any) => {
    const ref = db.collection("mascotas");
    const doc = await ref.get();
    doc.docs.map(doc=>{
        let mascota = doc.data() as Mascota;
        if(mascota.id==req.params.id){
            res.status(200).json({
                success: true,
                data: mascota
            });
        }
    });
    res.json({
        success: false,
        message: 'No existe ningún Mascota con el ID'+req.params.id
    });
    
});
router.delete("/eliminar-mascota/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    const ref = db.collection("mascotas").doc(req.params.id);
    ref.delete().then(response => { // Mascota eliminado
        res.status(200).json({
            success: true,
            message: 'La Mascota ha sido eliminada definitivamente del sistema',
        })
    }).catch(e => { // error al eliminar la Mascota
        res.status(400).json({
            success: false,
            message: 'Error al eliminar la Mascota'
        })
    });
});

module.exports = router;
