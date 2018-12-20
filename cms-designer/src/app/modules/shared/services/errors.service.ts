import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    displayMessage(message: string) {
        console.warn(message);
    }
}
