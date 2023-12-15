export class SeleccionesModel {
    id: number;
    usuarioId: number;
    habitacionId: number;

    constructor(params?: Partial<SeleccionesModel>) {
        this.id = params?.id || 0;
        this.usuarioId = params?.usuarioId || 0;
        this.habitacionId = params?.habitacionId || 0;
    }
}