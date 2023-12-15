import { Observable, firstValueFrom, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Constants } from '../models/constans.model';
import { ResponseMessage } from '../models/response.model';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ) { }

    get<T>(apiBase: string, path: string, obj?: any): Promise<ResponseMessage<T>> {
        return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Get, obj);
    }

    post<T>(apiBase: string, path: string, obj?: any): Promise<ResponseMessage<T>> {
        return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Post, obj);
    }

    put<T>(apiBase: string, path: string, obj?: any): Promise<ResponseMessage<T>> {
        return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Put, obj);
    }

    delete<T>(apiBase: string, path: string, obj?: any): Promise<ResponseMessage<T>> {
        return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Delete, obj);
    }

    download(apiBase: string, path: string, method: any, obj?: any): Observable<Blob> {
        let resul: Observable<Blob>;
        try {
            resul = this.http.get(`${apiBase}${path}`, { params: obj, responseType: 'blob' });
        } catch (error) {
            if (error === 'No current user') {
                console.log('catch download no current user');
            }
            resul = new Observable((observer) => {
                observer.error('Ocurrio un error, inténtelo nuevamente.');
            });
        }
        return resul;
    }

    private httpClient<T>(apiBase: string, path: string, method: any, obj?: any): Promise<ResponseMessage<T>> {
        let resul: Observable<ResponseMessage<T>> | null = null;;
        try {
            switch (method) {
                case Constants.API_METHODS.Get:
                    resul = this.http.get<ResponseMessage<T>>(`${apiBase}${path}`, { params: obj })
                        .pipe(catchError(e => this.catchErrorCustom<T>(e)));
                    break;
                case Constants.API_METHODS.Post:
                    resul = this.http.post<ResponseMessage<T>>(`${apiBase}${path}`, obj)
                        .pipe(catchError(e => this.catchErrorCustom<T>(e)));
                    break;
                case Constants.API_METHODS.Put:
                    resul = this.http.put<ResponseMessage<T>>(`${apiBase}${path}`, obj)
                        .pipe(catchError(e => this.catchErrorCustom<T>(e)));
                    break;
                case Constants.API_METHODS.Delete:
                    resul = this.http.delete<ResponseMessage<T>>(`${apiBase}${path}`, { params: obj })
                        .pipe(catchError(e => this.catchErrorCustom<T>(e)));
                    break;
            }
        } catch (error) {
            if (error === 'No current user') {
                console.log('catch error no current user');
            }
            resul = new Observable((observer) => {
                observer.error('Ocurrio un error, inténtelo nuevamente.');
            });
        }

        if (resul === null) {
            return Promise.reject('Ocurrió un error en la solicitud.');
        }

        return firstValueFrom(resul);
        //return lastValueFrom(resul);
    }

    private catchErrorCustom<T>(e: any) {
        if (typeof (e.error) === 'string') {
            // return throwError(e);
            return of(new ResponseMessage<T>(Constants.STATUS.Error, e.error));
        }
        return of(new ResponseMessage<T>(Constants.STATUS.Error, `Ocurrio un error, inténtelo nuevamente.`));
    }

}