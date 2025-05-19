import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * ApiService provides methods to interact with a backend API.
 * It is designed to handle common HTTP operations such as GET, POST, PUT, and DELETE
 * for specific data types and resource endpoints.
 * This service is intended to work with an API proxied to the '/api' endpoint.
 * It uses Angular's HttpClient module for HTTP requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private proxyApiUrl = '/api';

  constructor(private http: HttpClient) { }

  getData(dataType: string): Observable<any> {
    return this.http.get(`${this.proxyApiUrl}/${dataType}`);
  }

  getDataById(dataType: string, id: number): Observable<any> {
    return this.http.get(`${this.proxyApiUrl}/${dataType}/${id}`);
  }

  postData(dataType: string, data: any): Observable<any> {
    return this.http.post(`${this.proxyApiUrl}/${dataType}`, data);
  }

  putData(dataType: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.proxyApiUrl}/${dataType}/${id}`, data);
  }

  deleteData(dataType: string, id: number): Observable<any> {
    return this.http.delete(`${this.proxyApiUrl}/${dataType}/${id}`);
  }

}
