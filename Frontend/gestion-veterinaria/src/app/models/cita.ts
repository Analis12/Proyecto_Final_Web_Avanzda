import { Mascota } from './mascota';
import { Cliente } from './cliente';
import { Servicio } from './servicio';
export class Cita{
    id:string;
    fecha:string="";
    observaciones:string="";
    hora:number=0;
    mascota:Mascota;
    mascota_id:string;
    cliente_id:string="";
    cliente:Cliente;
    encargado_id:string="";
    servicio:Servicio = new Servicio();
}