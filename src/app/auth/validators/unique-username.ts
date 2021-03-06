import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {

    }
    validate = (control: FormControl) => {
        const { value } = control;
        return this.authService.userNameAvailable(value).pipe(
            map((value) => {
                if (value.available) {
                    return null;
                }
            }),
            catchError((err) => {
                if (err.error.username) {
                    return of({ nonUniqueUsername: true });
                } else {
                    return of({ noConnection: true });
                }
            })
        )
    }
}
