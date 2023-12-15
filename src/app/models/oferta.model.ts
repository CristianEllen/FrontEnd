export class OfertaModel {
    id: number;
    precio: number;
    habitaciones: number;
    num_banios: number;
    mascotas: string;
    num_contacto: number;
    usuario: number;
    prioridad: number;

    constructor(params?: Partial<OfertaModel>) {
        this.id = params?.id || 0;
        this.precio = params?.precio || 0;
        this.habitaciones = params?.habitaciones || 0;
        this.num_banios = params?.num_banios || 0;
        this.mascotas = params?.mascotas || '';
        this.num_contacto = params?.num_contacto || 0;
        this.usuario = params?.usuario || 0;
        this.prioridad = params?.prioridad || 0;
    }
}