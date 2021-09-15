import { HistoriaClinica } from './HistoriaClinica';
export class Mascota{
    id:string="";
    nombre:string="";
    raza:string="";
    edad:number = 0;
    color:string = "";
    historiaclinica:HistoriaClinica = new HistoriaClinica();
    duenio_id:string="";
}