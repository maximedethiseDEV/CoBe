import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SseService} from './sse.service';
import {AddressDto} from '../model/dto/address.dto';

@Injectable({providedIn: 'root'})
export class AddressService {
  private apiBaseUrl = '/api/addresses';

  constructor(
    private http: HttpClient,
    private sseService: SseService
  ) {
  }

  getAllAddresses(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(this.apiBaseUrl);
  }

  createAddress(address: AddressDto): Observable<AddressDto> {
    return this.http.post<AddressDto>(this.apiBaseUrl, address);
  }

  updateAddress(address: AddressDto): Observable<AddressDto> {
    return this.http.put<AddressDto>(`${this.apiBaseUrl}/${address.addressId}`, address);
  }

  deleteAddress(addressId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${addressId}`);
  }

  subscribeToAddressUpdates(): Observable<any> {
    return this.sseService.getServerSentEvents('addresses');
  }
}
