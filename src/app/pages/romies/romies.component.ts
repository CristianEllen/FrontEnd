import { Component, OnInit } from '@angular/core';

import { RomiesModel } from 'src/app/models/romies.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-romies',
  templateUrl: './romies.component.html',
  styleUrls: ['./romies.component.css']
})
export class RomiesComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 6;
  romiesData: RomiesModel[] = [];
  // esArrendador: boolean = false;

  constructor(private service: OrderDetailsService) { }


  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.listRomies(this.currentPage, this.itemsPerPage).subscribe(
      (data: RomiesModel[]) => {
        this.romiesData = this.romiesData.concat(data);
        this.romiesData.sort((a, b) => new Date(b.fechaCreacion || 0).getTime() - new Date(a.fechaCreacion || 0).getTime());
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}