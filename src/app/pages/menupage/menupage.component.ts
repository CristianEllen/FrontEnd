import { Component, OnInit } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OfertaDetallesModel } from 'src/app/models/ofertaDetalles.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {

  private ofertaId: number;
  public oferta = new OfertaDetallesModel();

  foodName: string;
  foodDetails: string;
  detallebanos: string;
  detallehabitaciones: string;
  detallemascotas: string;
  detallecontacto: string;
  foodPrice: number;
  fechaCreacion: string;

  esArrendador: boolean = false;
  esEstudiante: boolean = false;
  valoracion = 0;

  usuarios: any[] = [];
  hayInteresados: boolean = false;
  valoraciones: any[] = [];

  valoracionPromedio: number;

  usuarioLogueado: any;

  constructor(private router: ActivatedRoute, private service: OrderDetailsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let usuarioId = Number(localStorage.getItem('usuarioId'));
    this.service.getUsuario(usuarioId).subscribe(
      (usuario) => {
        this.usuarioLogueado = usuario;
      },
      (error) => {
        console.error('Error obteniendo usuario:', error);
      }
    );

    this.service.esArrendador$.subscribe((esArrendador) => {
      this.esArrendador = esArrendador;
    });

    this.service.esEstudiante$.subscribe((esEstudiante) => {
      this.esEstudiante = esEstudiante;
    });
  }

  ngAfterViewInit() {
    this.router.params.subscribe((params) => {
      this.ofertaId = +params['id'];
      if (this.ofertaId) {
        this.service.getPublicacionDetalles(this.ofertaId).subscribe(
          (oferta: OfertaDetallesModel) => {
            this.oferta = oferta;
            const usuarioIdStr = localStorage.getItem('usuarioId');
            if (usuarioIdStr === null) {
              console.error('No se encontró el usuarioId en el localStorage');
              return;
            }

            const usuarioId = +usuarioIdStr;
            this.service.getUsuarioYValoracion(usuarioId, this.ofertaId).subscribe(
              (valoracion) => {
                if (valoracion.length > 0) {
                  this.valoracion = valoracion[0].valoracion;
                } else {
                  this.valoracion = 0;
                }
              },
              (error) => {
                console.error('Error obteniendo valoración del usuario:', error);
              }
            );

            // Obtener los IDs de los usuarios interesados
            this.service.getSeleccionesPorHabitacion(this.ofertaId).subscribe(
              (selecciones: any[]) => {
                const observables = selecciones.map(seleccion => this.service.getUsuario(seleccion.usuarioId));
                // Utilizar forkJoin para esperar a que todas las solicitudes se completen
                forkJoin(observables).subscribe(
                  (usuarios) => {
                    // Aquí tienes los detalles de los usuarios interesados
                    this.usuarios = usuarios.flat();
                    this.hayInteresados = this.usuarios.length > 0;
                    this.cdr.detectChanges();
                  },
                  (error) => {
                    console.error('Error obteniendo usuarios interesados:', error);
                  }
                );
              },
              (error) => {
                console.error('Error obteniendo selecciones por habitación:', error);
              }
            );
          },
          (error) => {
            console.error('Error obteniendo detalles de la oferta:', error);
          }
        );
      } else {
        this.oferta = new OfertaDetallesModel();
      }
    }
    );

    //valoración total
    this.service.getValoracionesPorHabitacion(this.ofertaId).subscribe(
      (valoraciones) => {
        if (valoraciones.length > 0) {
          const suma = valoraciones.reduce((acumulador, valoracion) => acumulador + valoracion.valoracion, 0);
          this.valoracionPromedio = suma / valoraciones.length;
          console.log(this.valoracionPromedio);
        } else {
          this.valoracionPromedio = 0;
        }
      },
      (error) => {
        console.error('Error obteniendo valoraciones:', error);
      }
    );
  }

  valorar(estrellas: number) {
    let usuarioId = Number(localStorage.getItem('usuarioId'));
    this.service.getUsuarioYValoracion(usuarioId, this.ofertaId).subscribe(
      (respuesta) => {

        this.valoraciones.some(v => v.usuarioId === usuarioId && v.habitacionId === this.ofertaId);

        if (respuesta.length > 0) {
          Swal.fire('¡Error!', 'Ya has valorado la habitación', 'error');
        } else {
          this.valoracion = estrellas;

          const valoracion = {
            id: uuidv4(),
            usuarioId: usuarioId,
            habitacionId: this.ofertaId,
            valoracion: this.valoracion
          };

          this.service.guardarValoracion(valoracion).subscribe(
            (respuesta) => {
              console.log('Valoración guardada:', respuesta);
            },
            (error) => {
              console.error('Error guardando valoración:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error obteniendo valoración:', error);
      }
    );
  }

  fadeIn(): void {
    const container = document.querySelector('.imagen-container');
    if (container) {
      container.classList.add('loaded');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
