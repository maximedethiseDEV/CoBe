import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SseService} from './sse.service';
import {CityDto} from '../model/dto/city.dto';

@Injectable({providedIn: 'root'})
export class CityService {
  private apiBaseUrl = '/api/cities';

  constructor(
    private http: HttpClient,
    private sseService: SseService
  ) {
  }

  getAllCities(): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(this.apiBaseUrl);
  }

  createCity(city: CityDto): Observable<CityDto> {
    return this.http.post<CityDto>(this.apiBaseUrl, city);
  }

  updateCity(city: CityDto): Observable<CityDto> {
    return this.http.put<CityDto>(`${this.apiBaseUrl}/${city.cityId}`, city);
  }

  deleteCity(cityId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${cityId}`);
  }

  subscribeToCityUpdates(): Observable<any> {
    return this.sseService.getServerSentEvents('cities');
  }
}
