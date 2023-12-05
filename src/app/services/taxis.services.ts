import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import  {Observable} from 'rxjs';
import {Taxi} from '../entities/taxis.entities';
import {Location} from '../entities/locations.entities';

@Injectable({providedIn: 'root'})
export class TaxisService {
private host: string = environment.host;

  constructor(private http: HttpClient) {
  }

  public getTaxi(id: number): Observable<Taxi> {
    return this.http.get<Taxi>(this.host + '/taxis/' + id);
  }

  public getAllTaxis(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(this.host + '/taxis/all');
  }

  public createTaxi(taxi: Taxi): Observable<Taxi> {
    return this.http.post<Taxi>(this.host + '/taxis', taxi);
  }

  public updateTaxi(taxi: Taxi): Observable<Taxi> {
    return this.http.put<Taxi>(this.host + '/taxis/' + taxi.idtaxi, taxi);
  }

  public deleteTaxi(id: number): Observable<void> {
    return this.http.delete<void>(this.host + '/taxis/' + id);
  }

  public getLocationsByTaxi(id: number): Observable<Location[]> {
    return this.http.get<Location[]>(this.host + '/taxis/idtaxi=' + id );
  }
}
