import { HistoriaClinica } from './historia-clinica';
export class Mascota{
    id:string="";
    nombre:string="";
    raza:string="";
    edad:number = 0;
    color:string = "";
    historiaclinica:HistoriaClinica = new HistoriaClinica();
}