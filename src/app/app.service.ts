import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private _url = 'http://www2.rsphinx.com/static/misc/cric_scores.json';

    constructor(private http: HttpClient) {}

    getScore() {
        return this.http.get(this._url);
    }

}




