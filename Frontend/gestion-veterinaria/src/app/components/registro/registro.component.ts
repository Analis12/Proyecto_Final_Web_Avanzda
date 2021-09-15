import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cliente:Cliente = new Cliente();
  constructor(private cli:ClienteService,private router:Router) { }

  ngOnInit(): void {
  }
  registrar( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Validando información..',
      showConfirmButton: false,
      timer: 1500
    })
    Swal.showLoading();
    
    this.cli.guardar( this.cliente)
      .subscribe( resp => {
        Swal.close();
        this.router.navigateByUrl('/login');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }, (err) => {
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
