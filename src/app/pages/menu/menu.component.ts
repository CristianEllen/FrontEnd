import { Component, OnInit } from '@angular/core';

import { OfertaDetallesModel } from 'src/app/models/ofertaDetalles.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 6;
  foodData: OfertaDetallesModel[] = [];
  foodDataBackup: OfertaDetallesModel[] = [];
  esArrendador: boolean = false;
  esEstudiante: boolean = false;

  searchTerm: string = '';

  habitacionId: number;

  usuariosInteresados: any[] = [];

  activeRecordCount: number = 0;

  constructor(private service: OrderDetailsService) {
    this.foodData = [];
  }

  ngOnInit(): void {
    this.list();
    this.service.esArrendador$.subscribe((esArrendador) => {
      this.esArrendador = esArrendador;
    });
    this.service.esEstudiante$.subscribe((esEstudiante) => {
      this.esEstudiante = esEstudiante;
    });
  }

  list() {
    this.service.listOfertasDetalles(this.currentPage, this.itemsPerPage).subscribe(
      (data: OfertaDetallesModel[]) => {
        const newData = data.filter(oferta => oferta.status);
        this.foodData = [...this.foodData, ...newData]
        console.log('Ofertas', this.foodData);
        this.foodData.sort((a, b) => new Date(b.fechaCreacion || 0).getTime() - new Date(a.fechaCreacion || 0).getTime());

        // copia
        this.foodDataBackup = [...this.foodData];
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  filterByName(searchTerm: string): void {
    if (searchTerm) {
      this.foodData = this.foodDataBackup.filter(oferta =>
        oferta.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Si no hay término de búsqueda, mostrar la lista completa
      this.foodData = [...this.foodDataBackup];
    }
  }

  search(): void {
    this.filterByName(this.searchTerm);
  }

  delete(oferta: OfertaDetallesModel) {
    const index = this.foodData.indexOf(oferta);
    if (index !== -1) {
      Swal.fire({
        title: '¿Estás seguro?',
        html: `¿Seguro que desea eliminar la oferta <strong>${oferta.titulo}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          oferta.status = 0;
          this.service.updateOfertaDetalles(oferta).subscribe(
            () => {
              this.foodData.splice(index, 1);
              Swal.fire('¡Eliminado!', `La oferta ${oferta.titulo} ha sido eliminada.`, 'success');
              this.list();
            },
            (error) => {
              console.error('Error deleting data:', error);
            }
          );
        }
      });
    }
  }

  guardarSeleccion(event: Event, fd: number) {
    event.stopImmediatePropagation();
    event.preventDefault()
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    // const ofertaId = Number(localStorage.getItem('ofertaId'));

    try {
      this.service.saveSelecciones(usuarioId, fd).subscribe(
        (data) => {
          console.log('Selección guardada', data);
        },
        (error) => {
          console.error('Error al guardar la selección', error);
        }
      );
    } catch (error) {
      console.error('Error al guardar la selección', error);
    }

  }


  loadMore() {
    this.currentPage++;
    this.list();
  }
}
