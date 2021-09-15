import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-listadohistoriasclinicas',
  templateUrl: './listadohistoriasclinicas.component.html',
  styleUrls: ['./listadohistoriasclinicas.component.css']
})
export class ListadohistoriasclinicasComponent implements OnInit {

  listadoMascotas:Mascota[]=[];
  constructor(private masc:MascotaService) { }

  ngOnInit(): void {
    this.listado();
  }
  listado(){
    this.masc.listar().subscribe(res=>{
      this.listadoMascotas = res['data'];
    });
  }
}
