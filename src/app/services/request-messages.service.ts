import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMessage } from '../Models/RequestMessage';

@Injectable({
  providedIn: 'root'
})
export class RequestMessagesService {

  constructor(private httpClient: HttpClient) { }

  retrieveMessages(requestId: any): Observable<RequestMessage[]> {
    var params = new HttpParams();
    if (requestId)
      params = params.append('requestId', requestId);

    return this.httpClient.get<RequestMessage[]>('api/requestMessages/retrieve', { params });
  }

  sendMessage(requestId: number, userId: string, message: string): Observable<RequestMessage> {
    var body = { requestId: requestId, userId: userId, message: message };
    return this.httpClient.post<any>('api/requestMessages/send', body);
  }
}
