import { AgmCoreModule, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral }
    from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InterceptorSkipHeader } from './BaseUrlInterceptor';

export function agmConfigFactory(http: HttpClient, config: LazyMapsAPILoaderConfigLiteral) {
    // const headers = new HttpHeaders().set(InterceptorSkipHeader, ''); 
    // .set('Access-Control-Allow-Origin', '*');


    //This has to point to localhost:5001 because it is an internal endpoint for retrieving gmaps API key from .env
    // return () => http.get<any>("http://localhost:5001/getKey", { headers: new HttpHeaders().set(InterceptorSkipHeader, '') }).pipe(
    //     map(response => {
    //         config.apiKey = response.key;
    //         return response;
    //     }),
    //     catchError(err => {
    //         console.log('caught mapping error and rethrowing', err);
    //         return throwError(err);
    //     }),
    // ).toPromise();
    // axios.get('http://localhost:5001/getKey')

    const skipHeader = InterceptorSkipHeader;

    const axiosClient = axios.create({
        timeout: 3000,
        headers: {
            'X-Skip-Interceptor': ''
        }
    });

    return () => axiosClient.request<any>({
        method: "get",
        url: 'http://localhost:5001/getKey'
    }).then(response => {
        config.apiKey = response.data.key;
        return response;
    }).catch(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
    });
}


