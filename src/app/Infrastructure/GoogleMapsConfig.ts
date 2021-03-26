import { AgmCoreModule, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral }
    from '@agm/core';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
    apiKey: string = 'initialKey';
}