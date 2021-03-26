import { AgmCoreModule, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral }
    from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InterceptorSkipHeader } from './BaseUrlInterceptor';

export function agmConfigFactory(http: HttpClient, config: LazyMapsAPILoaderConfigLiteral) {
    //header for bypassing BaseUrlInterceptor
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    //This has to point to localhost:5001 because it is an internal endpoint for retrieving gmaps API key from .env
    return () => http.get<any>("http://localhost:5001/getKey", { headers }).pipe(
        map(response => {
            config.apiKey = response.key;
            return response;
        })
    ).toPromise();
}