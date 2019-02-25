import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    displayMessage(message: string, error: HttpErrorResponse = null) {
        console.warn(message, error);
    }
}
