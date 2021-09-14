import { Encargado } from './Encargado';
export class Producto{
    id:string="";
    imagen_producto:string="";
    nombre:string="";
    tipo:string="";
    encargado:Encargado = new Encargado();
}