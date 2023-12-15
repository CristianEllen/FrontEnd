export class OfertaDetallesModel {
    id: number;
    titulo?: string;
    descripcion?: string;
    num_banios?: string;
    num_habitaciones?: string;
    mascotas?: string;
    detallecontacto?: string;
    precio?: number;
    imagenreferencial: string;
    fechaCreacion?: string;
    disponible?: string;
    valoracion?: number;
    status: number;

    constructor(params?: Partial<OfertaDetallesModel>) {
        this.id = params?.id || 0;
        this.titulo = params?.titulo || '';
        this.descripcion = params?.descripcion || '';
        this.num_banios = params?.num_banios || '';
        this.num_habitaciones = params?.num_habitaciones || '';
        this.mascotas = params?.mascotas || '';
        this.detallecontacto = params?.detallecontacto || '';
        this.precio = params?.precio || 0;
        this.imagenreferencial = params?.imagenreferencial || '';
        this.fechaCreacion = params?.fechaCreacion || '';
        this.disponible = params?.disponible || '';
        this.valoracion = params?.valoracion || 0;
        this.status = params?.status || 0;
    }
}