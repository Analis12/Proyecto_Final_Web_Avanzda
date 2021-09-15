import { Servicio } from './Servicio';
export class Cita{
    id:string="";
    fecha:string="";
    observaciones:string="";
    hora:number=0;
    cliente_id:string="";
    encargado_id:string="";
    mascota_id:string="";
    servicio:Servicio = new Servicio();
}