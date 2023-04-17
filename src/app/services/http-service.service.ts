import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IQueryParameters {
  [key: string]: string | string[] | number;
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(url: URL, parameters?: IQueryParameters): Observable<T> {
    return this.httpClient.get<T>(url.toString(), { params: parameters });
  }

  public post<T>(
    url: URL,
    body?: any,
    parameters?: IQueryParameters
  ): Observable<T> {
    return this.httpClient.post<T>(url.toString(), body, {
      params: parameters,
    });
  }

  public put<T>(
    url: URL,
    body?: any,
    parameters?: IQueryParameters
  ): Observable<T> {
    return this.httpClient.put<T>(url.toString(), body, { params: parameters });
  }

  public delete<T>(
    url: URL,
    body?: any,
    parameters?: IQueryParameters
  ): Observable<T> {
    return this.httpClient.delete<T>(url.toString(), {
      body: body,
      params: parameters,
    });
  }
}
