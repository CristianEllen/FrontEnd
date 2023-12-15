export class ValoracionesModel {
    id: number;
    usuarioId: number;
    habitacionId: number;
    valoracion: number;

    constructor(params?: Partial<ValoracionesModel>) {
        this.id = params?.id || 0;
        this.usuarioId = params?.usuarioId || 0;
        this.habitacionId = params?.habitacionId || 0;
        this.valoracion = params?.valoracion || 0;
    }
}