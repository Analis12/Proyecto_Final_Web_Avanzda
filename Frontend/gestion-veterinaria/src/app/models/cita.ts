import { Mascota } from './mascota';
import { Cliente } from './cliente';
import { Servicio } from './servicio';
export class Cita{
    id:string="";
    fecha:string="";
    observaciones:string="";
    fecha_proxima:string="";
    hora:number=0;
    mascota:Mascota = new Mascota();
    cliente:Cliente = new Cliente();
    servicio:Servicioo = new Servicio();
}