export class RomiesModel {
    id: number;
    nombre: string;
    edad: number;
    apellidos: string;
    sexo: string;
    universidad: string;
    carrera: string;
    contacto: string;
    fechaCreacion?: string;
    img: string;

    constructor(params?: Partial<RomiesModel>) {
        this.id = params?.id || 0;
        this.nombre = params?.nombre || '';
        this.apellidos = params?.apellidos || '';
        this.edad = params?.edad || 0;
        this.sexo = params?.sexo || '';
        this.universidad = params?.universidad || '';
        this.carrera = params?.carrera || '';
        this.contacto = params?.contacto || '';
        this.fechaCreacion = params?.fechaCreacion || '';
        this.img = params?.img || '';
    }
}