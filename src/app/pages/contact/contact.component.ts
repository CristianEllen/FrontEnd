import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { OfertaDetallesModel } from 'src/app/models/ofertaDetalles.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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
  publicaciones: OfertaDetallesModel[] = [];

  cargando: boolean = false;

  constructor(private service: OrderDetailsService, private router: ActivatedRoute, private routerx: Router) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.ofertaId = +params['id'];
      if (this.ofertaId) {
        this.service.getOfertaDetalles(this.ofertaId).subscribe(
          (oferta: OfertaDetallesModel) => {
            this.oferta = oferta;
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
  }

  publicar(event: Event) {
    event.preventDefault();
    if (this.oferta.disponible === null || this.oferta.disponible === undefined) {
      this.oferta.disponible = 'true';
      Swal.fire('¡Error!', 'Es necesario seleccionar la disponibilidad', 'error');
      return;
    }
    if (this.oferta.id != 0) {
      this.service.updateOfertaDetalles(this.oferta).subscribe(
        (ofertaActualizada: OfertaDetallesModel) => {
          Swal.fire('¡Listo!', 'Oferta actualizada exitosamente', 'success');
          this.oferta = ofertaActualizada;
          this.routerx.navigate(['/menu']);
        },
        (error) => {
          Swal.fire('¡Error!', 'Es necesario seleccionar la disponibilidad', error);
        }
      );
    } else {
      this.oferta.fechaCreacion = new Date().toISOString();
      this.oferta.status = 1;
      this.service.createOfertaDetalles(this.oferta).subscribe(
        (ofertaCreada: OfertaDetallesModel) => {
          setTimeout(() => {
            this.publicaciones.push(ofertaCreada);
          }, 5000);
          Swal.fire('¡Listo!', 'Oferta creada exitosamente', 'success');
          this.oferta = new OfertaDetallesModel();
          this.routerx.navigate(['/menu']);
        },
        (error) => {
          console.error('Error!', 'Es necesario seleccionar la disponibilidad', error);
        }
      );
    }
  }

  selectedFileName: string;
  imagenes: any[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file.name;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.cargando = true;
      // this.imagenes.push(reader.result);
      this.service.subirImg(this.selectedFileName + "_" + Date.now(), reader.result).then(urlImg => {
        setTimeout(() => {
          this.oferta.imagenreferencial = urlImg;
          this.cargando = false;
        }, 5000);
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
