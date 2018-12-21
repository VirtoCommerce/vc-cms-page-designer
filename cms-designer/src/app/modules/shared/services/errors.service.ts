import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    displayMessage(message: string, error: HttpErrorResponse = null) {
        console.warn(message, error);
    }
}
