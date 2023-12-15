import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  userlogin: LoginModel;

  passwordShown = false;

  constructor(
    private service: OrderDetailsService,
    private router: Router
  ) {
    // if (this.authService.isUserLoggedIn()) {
    //   this.router.navigate(['/contact']);
    // }
  }

  ngOnInit() { }

  async onSubmit() {
    try {
      this.service.login(this.username, this.password)
        .subscribe(user => {
          if (user) {
            if (user.esArrendador) {
              Swal.fire('¡Bienvenido!', 'has ingresado como arrendador', 'success');
              this.service.setEsArrendador(true);
              this.router.navigate(['/contact']);
            } else if (user.esEstudiante) {
              Swal.fire('¡Bienvenido!', 'has ingresado como estudiante', 'success');
              this.service.setEstudiante(true);
              this.router.navigate(['/menu']);
            } else {
              Swal.fire('Oops', 'Credenciales inválidas o no eres Arrendador/Estudiante', 'error');
            }
          } else {
            Swal.fire('Oops', 'Credenciales invalidas o no eres Arrendador/Estudiante', 'error');
          }
        });
    } catch (error) {
      Swal.fire('Oops', 'Credenciales invalidas o no eres Arrendador/Estudiante', 'error');
    }
  }

  togglePassword() {
    this.passwordShown = !this.passwordShown;
  }
}
