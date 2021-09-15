import * as admin from 'firebase-admin';
import { Cliente } from '../models/Cliente';
import { estaAutenticado } from "../middlewares/seguridad";
import { estaAutorizado } from "../middlewares/seguridad";
// Models
const db = admin.firestore();
const router = require("express").Router();
// Services
router.post("/registrar-cliente",async (req:any, res:any) => {
    let usuario:Cliente = req.body as Cliente;
    let auth:any ={email:usuario.email,password:usuario.password,rol:usuario.rol};
    await admin.auth().createUser({...auth})
    .then(function() {
        //Añadir rol del cliente
        admin.auth().getUserByEmail(auth.email).then(cliente=>{
            admin.auth().setCustomUserClaims(cliente.uid,{
                rol:auth.rol,
                cedula:usuario.cedula
            });
        }).then(()=>{
            //Guardar información en la base de datos
            usuario.password = "";
            usuario.id = usuario.cedula;
            const newUsuarioRef = db.collection('clientes').doc(usuario.id);
            newUsuarioRef.set(JSON.parse(JSON.stringify(usuario))).then(response => { // Cliente creado
                res.json({
                    success: true,
                    message: 'Registro de cliente correctamente',
                })
            }).catch(e => { //  error al crear un cliente
                res.json({
                    success: false,
                    message: 'Error en registro de cliente nuevo'
                })
            });
        }).catch(e => { //  error al crear un cliente
            res.json({
                success: false,
                message: 'Error en registro de cliente nuevo'
            })
        });
    })
    .catch(function(error) {
      res.status(400).json({
        ok:false,
        mensaje: error.message
      });
    });
   
});

router.put("/actualizar-cliente",estaAutenticado,estaAutorizado({ hasRole: ['cliente'] }),async (req:any, res:any) => {
    let usuario:Cliente= req.body as Cliente;
    const updateUsuarioRef = db.collection('clientes').doc(usuario.id);
        updateUsuarioRef.update(JSON.parse(JSON.stringify(usuario)))
        .then(()=> { // Cliente actualizado
            res.json({
                success: true,
                message: 'Actualización de cliente correctamente',
            })
        }).catch(() => { // error al actualizar cliente
            res.json({
                success: false,
                message: 'Error en actualización de cliente'
            })
        });
});

router.get("/listar-clientes",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    const ref = db.collection("clientes");
    const doc = await ref.get();
    let usuariolist:Cliente[]=[];
    doc.docs.map(doc=>{
        let usuario = doc.data() as Cliente;
        usuariolist.push(usuario);
    });
    res.json({
        success: true,
        data: usuariolist
    });
});

router.get("/:id", estaAutenticado,estaAutorizado({ hasRole: ['cliente','encargado'] }),async (req:any, res:any) => {
    const ref = db.collection("clientes");
    const doc = await ref.get();
    doc.docs.map(doc=>{
        let usuario = doc.data() as Cliente;
        console.log(usuario);
        if(usuario.id==req.params.id){
            res.status(200).json({
                success: true,
                data: usuario
            });
        }
    });
    res.json({
        success: false,
        message: 'No existe ningún Cliente con el ID'+req.params.id
    });
    
});

router.delete("/eliminar-cliente/:id",estaAutenticado,estaAutorizado({ hasRole: ['cliente'] }),async (req:any, res:any) => {
    const ref = db.collection("clientes").doc(req.params.id);
    ref.delete().then(response => { // Cliente Eliminado
        res.json({
            success: true,
            message: 'El Cliente ha sido eliminado definitivamente del sistema',
        })
    }).catch(e => { // error al eliminar cliente
        res.json({
            success: false,
            message: 'Error al eliminar el Cliente'
        })
    });
});
module.exports = router;
