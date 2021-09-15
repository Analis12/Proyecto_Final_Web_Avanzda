import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { MascotaService } from '../../services/mascota.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-mascota',
  templateUrl: './registrar-mascota.component.html',
  styleUrls: ['./registrar-mascota.component.css']
})
export class RegistrarMascotaComponent implements OnInit {

  mascota:Mascota = new Mascota();
  title:string = "Registrar Mascota";
  rol:string="";
  constructor(private masc:MascotaService,private router:Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.rol = payLoad.rol;
    this.verificarId();
  }
  verificarId(){
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.masc.consultar(params['id']).subscribe(result => {
            this.mascota = result['data'];
            this.title = "Modificar Mascota";
          });
        }else{
          this.title = "Registrar Mascota";
        }
      },(error)=>console.error(error),()=>{
      }
    );
  }
  enrutar(){
    switch(this.rol){
      case "cliente":{
        this.router.navigateByUrl('/cliente');
        break;
      }
      case "encargado":{
        this.router.navigateByUrl('/encargado');
        break;
      }
    }
    
  }
  guardar( form: NgForm ) {

    if (  form.invalid ) { return; }
    if(localStorage.getItem('token')){
      const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      if(this.mascota.id==undefined){
        this.mascota.duenio_id = payLoad.cedula;
      }
    } 
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Validando información..',
      showConfirmButton: false,
      timer: 1500
    })
    Swal.showLoading();
    console.log(this.mascota.duenio_id);
    this.masc.guardar(this.mascota)
      .subscribe( resp => {
        Swal.close();
        if(this.rol=="cliente"){
          this.router.navigateByUrl('/cliente/mis-mascotas');
        }else{
          this.router.navigateByUrl('/encargado/mis-mascotas');
        }
       
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Correctamente',
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
