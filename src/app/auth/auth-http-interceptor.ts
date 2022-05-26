import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone(
            { withCredentials: true }
        )
        return next.handle(modifiedReq);
        // .pipe(
        //     (tap(val => {
        //         if (val.type === HttpEventType.Sent) {
        //             console.log('req sent to server',val);
        //         }
        //         if (val.type === HttpEventType.Response) {
        //             console.log('response from server', val);

        //         }
        //     }))
        // );
    }
}
