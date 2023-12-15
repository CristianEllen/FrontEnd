export module Constants {

    export module STATUS {
        export let Success = 1;
        export let Error = -1;
        export let Warning = -2;
        export let Forbidden = -3;
        export let Unauthorized = -4;
        export let UnprocessableModel = -5;
    }

    export module MESSAGE_STATUS {
        export let Success = 'La operación se ejecutó correctamente';
        export let Error = 'Ocurrio un error';
        export let Warning = 'Advertencia';
        export let Forbidden = 'Acceso Denegado';
        export let Unauthorized = 'No Autorizado';
        export let UnprocessableModel = 'Unprocessable';
    }

    export module API_METHODS {
        export let Get = 1;
        export let Post = 2;
        export let Put = 3;
        export let Delete = 4;
    }

}