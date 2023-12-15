import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";

@Injectable()
export class CoreService {
    constructor(
        public httpService: HttpService,
    ) {
    }
}