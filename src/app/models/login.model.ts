export class LoginModel {
    id: number;
    usuario: string;
    contrasena: string;
    esArrendador: boolean;
    esEstudiante: boolean;
    nombres: string;
    apellidos: string;
    celular: string;


    constructor(params?: Partial<LoginModel>) {
        this.id = params?.id || 0;
        this.usuario = params?.usuario || '';
        this.contrasena = params?.contrasena || '';
        this.esArrendador = false;
        this.esEstudiante = false;
        this.nombres = params?.nombres || '';
        this.apellidos = params?.apellidos || '';
        this.celular = params?.celular || '';
    }
}
