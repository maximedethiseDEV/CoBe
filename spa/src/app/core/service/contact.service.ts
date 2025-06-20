import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ContactDto} from '../model/dto/contact.dto';
import {SseService} from './sse.service';

@Injectable({providedIn: 'root'})
export class ContactService {
  private apiBaseUrl = '/api/contacts';

  constructor(
    private http: HttpClient,
    private sseService: SseService
  ) {
  }

  getAllContacts(): Observable<ContactDto[]> {
    return this.http.get<ContactDto[]>(this.apiBaseUrl);
  }

  createContact(contact: ContactDto): Observable<ContactDto> {
    return this.http.post<ContactDto>(this.apiBaseUrl, contact);
  }

  subscribeToContactUpdates(): Observable<any> {
    return this.sseService.getServerSentEvents('contacts');
  }
}
