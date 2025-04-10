import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  putData(dataType: string, data: any): Observable<any> {
    return this.http.put(`${this.proxyApiUrl}/${dataType}`, data);
  }

  deleteData(dataType: string, id: number): Observable<any> {
    return this.http.delete(`${this.proxyApiUrl}/${dataType}/${id}`);
  }
}
