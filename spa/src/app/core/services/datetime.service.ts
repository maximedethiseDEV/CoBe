import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {

    convertDatetimeLocalToIso(localDateTime: string): string | null {
        if (!localDateTime) {
            return null
        }
        else return new Date(localDateTime).toISOString();
    };
}
