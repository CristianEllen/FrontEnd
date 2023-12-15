import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() { }

	// getToken(): string | null {
	// 	return localStorage.getItem('true');
	// }

	// isUserLoggedIn(): boolean {
	// 	return !!this.getToken();
	// }

	// setEsArrendador(value: boolean) {
	// 	localStorage.setItem('esArrendador', value ? 'true' : 'false');
	// }

	// getEsArrendador(): boolean {
	// 	return localStorage.getItem('esArrendador') === 'true';
	// }
}

