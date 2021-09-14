import { Cliente } from './Cliente';
import { Servicio } from './Servicio';
import { Mascota } from './Mascota';
export class Cita{
    id:string="";
    fecha:string="";
    observaciones:string="";
    fecha_proxima:string="";
    hora:number=0;
    mascota:Mascota = new Mascota();
    cliente:Cliente = new Cliente();
    servicio:Servicio = new Servicio();
}