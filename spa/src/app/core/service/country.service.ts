import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SseService} from './sse.service';
import {CountryDto} from '../model/dto/country.dto';

@Injectable({providedIn: 'root'})
export class CountryService {
  private apiBaseUrl = '/api/countries';

  constructor(
    private http: HttpClient,
    private sseService: SseService
  ) {
  }

  getAllCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(this.apiBaseUrl);
  }

  createCountry(country: CountryDto): Observable<CountryDto> {
    return this.http.post<CountryDto>(this.apiBaseUrl, country);
  }

  updateCountry(country: CountryDto): Observable<CountryDto> {
    return this.http.put<CountryDto>(`${this.apiBaseUrl}/${country.countryId}`, country);
  }

  deleteCountry(countryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${countryId}`);
  }

  subscribeToCountryUpdates(): Observable<any> {
    return this.sseService.getServerSentEvents('countries');
  }
}
