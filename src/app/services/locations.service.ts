import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Location} from "../entities/locations.entities";
import {Client} from "../entities/clients.entities";
import {Taxi} from "../entities/taxis.entities";
import {Adresse} from "../entities/addresses.entities";
import {formatDate} from "@angular/common";

@Injectable({providedIn: 'root'})
export class LocationsService {
  private host = environment.host;

  constructor(private http: HttpClient) {
  }

  public getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(this.host + '/locations/' + id);
  }

  public updateLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(this.host + '/locations/' + location.idlocation, location);
  }

  public createLocation(location : Location): Observable<Location> {
    alert(location + "create location");
    return this.http.post<Location>(this.host + '/locations', location);
  }

  public deleteLocation(id : number): Observable<Location> {
    return this.http.delete<Location>(this.host + '/locations/' + id);
  }

  public getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.host + '/locations/all');
  }

  public getLocationByClient(client: Client): Observable<Location[]> {
    return this.http.get<Location[]>(this.host + '/locations/client=' + client.idclient);
  }

  public getLocationByTaxi(taxi: Taxi): Observable<Location[]> {
    return this.http.get<Location[]>(this.host + '/locations/taxi=' + taxi.idtaxi);
  }


  public getLocationByDate(date: Date): Observable<Location[]> {
    return this.http.get<Location[]>(this.host + '/locations/date=' + formatDate(date, 'yyyy-MM-dd', 'en'));
  }





}
