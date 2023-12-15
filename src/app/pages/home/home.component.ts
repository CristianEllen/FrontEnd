import { Component, OnInit } from '@angular/core';

import { OfertaDetallesModel } from 'src/app/models/ofertaDetalles.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 6;
  foodData: OfertaDetallesModel[] = [];
  foodDataBackup: OfertaDetallesModel[] = [];
  esArrendador: boolean = false;

  constructor(private service: OrderDetailsService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.service.listOfertasDetalles(this.currentPage, this.itemsPerPage).subscribe(
      (data: OfertaDetallesModel[]) => {
        this.foodData = this.foodData.concat(data);
        this.foodData.sort((a, b) => new Date(b.fechaCreacion || 0).getTime() - new Date(a.fechaCreacion || 0).getTime());
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


}
