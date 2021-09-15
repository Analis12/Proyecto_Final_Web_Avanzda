import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarhistoriaclinica',
  templateUrl: './agregarhistoriaclinica.component.html',
  styleUrls: ['./agregarhistoriaclinica.component.css']
})
export class AgregarhistoriaclinicaComponent implements OnInit {

  mascota:Mascota = new Mascota();
  vacuna:string = "";
  desparacitacion:string = "";
  constructor(private masc:MascotaService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.verificarId();
  }
  verificarId(){
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.masc.consultar(params['id']).subscribe(result => {
            this.mascota = result['data'];
          });
        }
      },(error)=>console.error(error),()=>{
      }
    );
  }
  guardar( form: NgForm ) {

    if (  form.invalid ) { return; }
    if(localStorage.getItem('token')){
      const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      if(this.mascota.id==undefined){
        this.mascota.duenio_id = payLoad.cedula;
      }
      
    } 
    this.mascota.historiaclinica.vacunas.push(this.vacuna);
    this.mascota.historiaclinica.desparacitaciones.push(this.desparacitacion);
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Validando información..',
      showConfirmButton: false,
      timer: 1500
    })
    Swal.showLoading();
    
    this.masc.guardar( this.mascota)
      .subscribe( resp => {
        Swal.close();
        this.router.navigateByUrl('/encargado/historiasclinicas/listado');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actualización Correctamente',
          showConfirmButton: false,
          timer: 1500
        });

      }, (err) => {
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Hubo un error vuelva a intentarlo',
          showConfirmButton: false,
          timer: 1500
        })
      });

  }
}
