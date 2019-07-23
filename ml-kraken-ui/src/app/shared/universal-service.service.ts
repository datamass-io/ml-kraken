import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UniversalService {

    constructor(private httpClient: HttpClient) {}

    api_path = 'https://nfxfkb0wdd.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-meta';

    public get(options = {}): Observable<any> {
        return this.httpClient.get(this.api_path, options);
    }
}
