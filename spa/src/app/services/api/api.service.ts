import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getData(dataType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${dataType}`);
  }

  getDataById(dataType: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${dataType}/${id}`);
  }

  postData(dataType: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${dataType}`, data);
  }

  putData(dataType: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${dataType}`, data);
  }

  deleteData(dataType: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${dataType}/${id}`);
  }


  getFilterData(filter: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}`);
  }

  getSortData(sort: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/sort/${sort}`);
  }

  getPaginateData(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/page/${page}`);
  }

  getSearchData(search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/search/${search}`);
  }

  getFilterSortData(filter: string, sort: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}/sort/${sort}`);
  }

  getFilterPaginateData(filter: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}/page/${page}`);
  }

  getFilterSearchData(filter: string, search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}/search/${search}`);
  }

  getSortPaginateData(sort: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/sort/${sort}/page/${page}`);
  }

  getSortSearchData(sort: string, search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/sort/${sort}/search/${search}`);
  }

  getPaginateSearchData(page: number, search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/page/${page}/search/${search}`);
  }

  getFilterSortPaginateData(filter: string, sort: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}/sort/${sort}/page/${page}`);
  }

  getFilterSortSearchData(filter: string, sort: string, search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}/sort/${sort}/search/${search}`);
  }

  getFilterPaginateSearchData(filter: string, page: number, search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/filter/${filter}/page/${page}/search/${search}`);
  }

  getSortPaginateSearchData(sort: string, page: number, search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/sort/${sort}/page/${page}/search/${search}`);
  }
}
