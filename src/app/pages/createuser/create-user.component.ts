import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;

  constructor(private service: OrderDetailsService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      esArrendador: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('falla');
    if (this.form.valid) {
      let formValues = this.form.value;

      if (formValues.esArrendador == 'true') {
        formValues.esArrendador = true;
        formValues.esEstudiante = false;
      } else {
        formValues.esArrendador = false;
        formValues.esEstudiante = true;
      }

      this.service.createUser(this.form.value).subscribe(
        (newUser) => {
          Swal.fire('¡Listo!', 'Usuario creado exitosamente', 'success');
          this.router.navigate(['/login']);

        },
        (error) => {
          console.error('Error creando usuario:', error);
        }
      );
    } else {
      Swal.fire('¡Error!', 'Es necesario llenar todos los campos', 'error');
    }
  }

}
