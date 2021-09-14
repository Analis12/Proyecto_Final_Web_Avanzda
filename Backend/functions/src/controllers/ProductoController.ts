import * as admin from 'firebase-admin';
import { estaAutenticado } from "../middlewares/seguridad";
import { estaAutorizado } from "../middlewares/seguridad";
import { Producto } from '../models/Producto';
// Models
const db = admin.firestore();
const router = require("express").Router();
// Services

router.post("/registrar-producto", estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }), async (req:any, res:any) => {
    let producto:Producto = req.body as Producto;
    const newProductoRef = db.collection('productos').doc();
    producto.id = newProductoRef.id;
    newProductoRef.set(JSON.parse(JSON.stringify(producto))).then(response => { // Producto creado
            res.status(201).json({
                success: true,
                message: 'Registro de nuevo producto correctamente',
            })
        }).catch(e => { // error al crear producto
            res.status(400).json({
                success: false,
                message: 'Error en registro de nuevo producto'
            })
        });
   
});

router.put("/actualizar-producto",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    let producto:Producto = req.body as Producto;
    const updateuserRef =db.collection('productos').doc(producto.id);
        updateuserRef.update(JSON.parse(JSON.stringify(producto)))
        .then(()=> { // Producto actualizado
            res.status(200).json({
                success: true,
                message: 'Actualización de Producto correctamente',
            })
        }).catch(() => { // error al actualizar Producto
            res.status(400).json({
                success: false,
                message: 'Error en actualización de Producto'
            })
        });
});
router.get("/listar-productos",async (req:any, res:any) => {
    const ref = db.collection("productos");
    const doc = await ref.get();
    let productoslist:Producto[] =[];
    doc.docs.map(doc=>{
        let producto = doc.data() as Producto;
        productoslist.push(producto);
    });
    res.status(200).json({
        success: true,
        data: productoslist
    });
});

router.get("/:id",async (req:any, res:any) => {
    const ref = db.collection("productos");
    const doc = await ref.get();
    doc.docs.map(doc=>{
        let producto = doc.data() as Producto;
        if(producto.id==req.params.id){
            res.status(200).json({
                success: true,
                data: producto
            });
        }
    });
    res.json({
        success: false,
        message: 'No existe ningún Producto con el ID'+req.params.id
    });
    
});
router.delete("/eliminar-producto/:id",estaAutenticado,estaAutorizado({ hasRole: ['encargado'] }),async (req:any, res:any) => {
    const ref = db.collection("productos").doc(req.params.id);
    ref.delete().then(response => { // Producto eliminado
        res.status(200).json({
            success: true,
            message: 'El producto ha sido eliminado definitivamente del sistema',
        })
    }).catch(e => { // error al eliminar el producto
        res.status(400).json({
            success: false,
            message: 'Error al eliminar el producto'
        })
    });
});


module.exports = router;
