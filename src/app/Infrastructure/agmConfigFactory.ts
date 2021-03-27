import { AgmCoreModule, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral }
    from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function agmConfigFactory(http: HttpClient, config: LazyMapsAPILoaderConfigLiteral) {

    return () => http.get<any>("gm/getKey").pipe(
        map(response => {
            config.apiKey = response.key;
            return response;
        }),
        catchError(err => {
            console.log('caught mapping error and rethrowing', err);
            return throwError(err);
        }),
    ).toPromise();
}


