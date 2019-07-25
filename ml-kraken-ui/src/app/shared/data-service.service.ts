import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class DataService {

    selectedData = new Subject<any>();

    constructor(private httpClient: HttpClient) {}

    public get(path, options = {}): Observable<any> {
        return this.httpClient.get(path, options);
    }

    public put(path, item): Observable<any> {
        return this.httpClient.put(path, item);
    }

    public post(path, item, options = {}): Observable<any> {
        return this.httpClient.post(path, item, options);
    }

    public delete(path, options = {}): Observable<any> {
        return this.httpClient.delete(path, options);
    }
}
