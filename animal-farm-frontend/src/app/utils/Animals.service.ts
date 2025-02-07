

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AnimalsService {
    private apiUrl = 'http://localhost:3000/api/animals';

    constructor(private http: HttpClient) {}

    getAnimals(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    feedAnimal(animalId: number, isThanks: boolean): Observable<any> {
        return this.http.post(`${this.apiUrl}/${animalId}/feed`, { isThanks });
    }

}
