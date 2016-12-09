import { Injectable } from "@angular/core";
import { Interceptor } from "../index";
import { Observable } from "rxjs/Observable";
import {Request} from "@angular/http";

@Injectable()
export abstract class LoginService {
    abstract login();
    abstract loginExpired();
}

@Injectable()
export class AjaxTimeoutInterceptor implements Interceptor {
    STATUS_CODE = 901;
    constructor(private loginService: LoginService) {
    }

    before(request: any): Observable<void> {
        return Observable.of(request)
    }

    after(response: any) {
        if (response.status === this.STATUS_CODE) {
            this.loginService.loginExpired();
        }
    }

    error(err: any) {
    }

    toString() {
        return "AjaxTimeoutInterceptor";
    }
}