import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  esArrendador: boolean = false;
  esEstudiante: boolean = false;

  constructor(private service: OrderDetailsService) { }

  ngOnInit(): void {
    this.service.esArrendador$.subscribe((esArrendador) => {
      this.esArrendador = esArrendador;
    });

    this.service.esEstudiante$.subscribe((esEstudiante) => {
      this.esEstudiante = esEstudiante;
    });

  }

  logout() {
    this.service.setEsArrendador(false);
    localStorage.setItem('esArrendador', 'false');
    this.service.setEstudiante(false);
    localStorage.setItem('esEstudiante', 'false');
    localStorage.removeItem('ofertaId');
    localStorage.removeItem('usuarioId');
  }

  getLogoutText(): string {
    return this.esArrendador || this.esEstudiante ? 'Salir' : 'Login';
  }

}
