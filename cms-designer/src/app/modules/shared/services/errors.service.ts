import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private toastr: ToastrService) { }

    displayMessage(message: any) {
        this.toastr.success(message);
    }

    displayError(message, error) {
        console.warn(message, error);
        this.toastr.error(message);
    }
}
