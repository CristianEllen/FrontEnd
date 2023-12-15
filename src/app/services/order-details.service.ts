import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/storage';
import { BehaviorSubject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { LoginModel } from '../models/login.model';
import { OfertaDetallesModel } from '../models/ofertaDetalles.model';
import { PATHS } from '../models/paths.model';
import { RomiesModel } from '../models/romies.model';
import { SeleccionesModel } from '../models/selecciones.model';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
	providedIn: 'root'
})
export class OrderDetailsService {

	users: LoginModel[];

	constructor(
		private http: HttpClient
	) {
		this.setEsArrendador(this.getEsArrendador());
	}

	// FAKE APIS

	private API_SERVER = "https://apirest-6yg7.onrender.com";
	// private API_SERVER = "http://localhost:3000";

	// Para arrendador
	private esArrendadorSubject = new BehaviorSubject<boolean>(false);
	esArrendador$ = this.esArrendadorSubject.asObservable();

	getEsArrendador(): boolean {
		const value = localStorage.getItem('esArrendador') === 'true';
		return value;
	}

	setEsArrendador(value: boolean) {
		this.esArrendadorSubject.next(value);
		localStorage.setItem('esArrendador', value ? 'true' : 'false');
	}

	// Para estudiante

	private esEstudianteSubject = new BehaviorSubject<boolean>(false);
	esEstudiante$ = this.esEstudianteSubject.asObservable();

	getEstudiante(): boolean {
		const value = localStorage.getItem('esEstudiante') === 'true';
		return value;
	}

	setEstudiante(value: boolean) {
		this.esEstudianteSubject.next(value);
		localStorage.setItem('esEstudiante', value ? 'true' : 'false');
	}

	// APIS 
	listOfertasDetalles(page: number, itemsPerPage: number): Observable<OfertaDetallesModel[]> {
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return this.http.get<OfertaDetallesModel[]>(`${this.API_SERVER}${PATHS.INTRANET.ofertaDetalles}?_start=${start}&_end=${end}`);
	}

	login(username: string, password: string): Observable<LoginModel | null> {
		return this.http.get<LoginModel[]>(`${this.API_SERVER}${PATHS.INTRANET.login}?usuario=${username}&contrasena=${password}`)
			.pipe(
				map(users => {
					const user = users.find(u => u.usuario === username && u.contrasena === password);
					if (user) {
						localStorage.setItem('usuarioId', user.id.toString());
						return user;
					}
					return null;
				})
			);
	}

	storareRef = firebase.app().storage().ref();

	async subirImg(nombre: string, imgBase64: any) {
		try {
			let res = await this.storareRef.child("ofertas/" + nombre).putString(imgBase64, 'data_url');
			return await res.ref.getDownloadURL();
		} catch (err) {
			console.log(err);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Hubo un error al subir la imagen: ' + err,
			});
			return null;
		}
	}

	createOfertaDetalles(ofertaDetalles: OfertaDetallesModel): Observable<OfertaDetallesModel> {
		return this.http.post<OfertaDetallesModel>(`${this.API_SERVER}${PATHS.INTRANET.ofertaDetalles}`, ofertaDetalles);
	}

	getOfertaDetalles(ofertaId: number): Observable<OfertaDetallesModel> {
		localStorage.setItem('ofertaId', ofertaId.toString());
		return this.http.get<OfertaDetallesModel>(`${this.API_SERVER}${PATHS.INTRANET.ofertaDetalles}/${ofertaId}`);
	}

	updateOfertaDetalles(ofertaDetalles: OfertaDetallesModel): Observable<OfertaDetallesModel> {
		return this.http.put<OfertaDetallesModel>(`${this.API_SERVER}${PATHS.INTRANET.ofertaDetalles}/${ofertaDetalles.id}`, ofertaDetalles);
	}

	deleteOfertaDetalles(id: number): Observable<void> {
		return this.http.delete<void>(`${this.API_SERVER}${PATHS.INTRANET.ofertaDetalles}/${id}`);
	}

	// romies
	listRomies(page: number, itemsPerPage: number): Observable<RomiesModel[]> {
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return this.http.get<RomiesModel[]>(`${this.API_SERVER}${PATHS.INTRANET.romies}?_start=${start}&_end=${end}`);
	}

	getPublicacionDetalles(ofertaId: number): Observable<OfertaDetallesModel> {
		return this.http.get<OfertaDetallesModel>(`${this.API_SERVER}${PATHS.INTRANET.publicacionDetalles}/${ofertaId}`);
	}

	// Relacion de estudiante - habitación
	saveSelecciones(usuarioId: number, habitacionId: number): Observable<SeleccionesModel> {
		const data = {
			usuarioId: usuarioId,
			habitacionId: habitacionId
		};
		return this.http.post<SeleccionesModel>(`${this.API_SERVER}${PATHS.INTRANET.selecciones}`, data);
	}

	getSeleccionesPorHabitacion(habitacionId: number): Observable<number[]> {
		return this.http.get<number[]>(`${this.API_SERVER}${PATHS.INTRANET.selecciones}?habitacionId=${habitacionId}`);
	}

	getUsuario(usuarioId: number): Observable<LoginModel> {
		return this.http.get<LoginModel>(`${this.API_SERVER}${PATHS.INTRANET.login}?id=${usuarioId}`);
	}

	// valoraciones

	guardarValoracion(valoracion: any): Observable<any> {
		return this.http.post(`${this.API_SERVER}${PATHS.INTRANET.valoraciones}`, valoracion);
	}

	getUsuarioYValoracion(usuarioId: number, habitacionId: number): Observable<any> {
		return this.http.get<AnyCatcher>(`${this.API_SERVER}${PATHS.INTRANET.valoraciones}?usuarioId=${usuarioId}&habitacionId=${habitacionId}`);
	}

	getValoracionesPorHabitacion(habitacionId: number): Observable<any[]> {
		return this.http.get<any[]>(`${this.API_SERVER}${PATHS.INTRANET.valoraciones}?habitacionId=${habitacionId}`);
	}

	// Creación de nuevos usuarios
	createUser(usuario: LoginModel): Observable<LoginModel> {
		return this.http.post<LoginModel>(`${this.API_SERVER}${PATHS.INTRANET.login}`, usuario);
	}

}

