import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {

    constructor(private toastr: ToastrService) { }

    displayMessage(message: any, error: HttpErrorResponse = null) {
        console.warn(message, error);
        if (error) {
            this.toastr.error(message);
        } else {
            this.toastr.success(message);
        }
    }
}
