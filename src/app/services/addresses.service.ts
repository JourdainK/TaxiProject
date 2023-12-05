import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Adresse} from "../entities/addresses.entities";
//import {Location} from "../entities/locations.entities";

@Injectable({providedIn: 'root'})
export class AddressesService {
    private host: string = environment.host;

    constructor(private http: HttpClient) {
    }

    public getAdresse(id: number): Observable<Adresse> {
        return this.http.get<Adresse>(this.host + '/addresses/' + id);
    }

    public getAdresseByClient(id: number): Observable<Adresse[]> {
        return this.http.get<Adresse[]>(this.host + '/addresses/client/' + id);
    }

    public getAllAddresses(): Observable<Adresse[]> {
        return this.http.get<Adresse[]>(this.host + '/addresses/all');
    }

    public createAdresse(adresse: Adresse): Observable<Adresse> {
        return this.http.post<Adresse>(this.host + '/addresses', adresse);
    }

    public updateAddress(adresse: Adresse): Observable<Adresse> {
        return this.http.put<Adresse>(this.host + '/addresses/' + adresse.idadresse, adresse);
    }

    public deleteAddress(id: number): Observable<void> {
        return this.http.delete<void>(this.host + '/addresses/' + id);
    }
}
