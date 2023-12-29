import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Client} from "../entities/clients.entities";
//import {Location} from "../entities/locations.entities";


@Injectable({providedIn: "root"})
export class ClientsService {
  private host = environment.host;

  constructor(private http: HttpClient) {
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.host + '/clients/' + id);
  }

  getClientUnique(nomcli: string, prenomcli: string, mail: string): Observable<Client> {
    return this.http.get<Client>(this.host + '/clients/' + nomcli + '/' + prenomcli + '/' + mail);
  }

  getClientByNom(nomcli: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.host + '/clients/nom=' + nomcli);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.host + '/clients/all');
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.host + '/clients', client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.host + '/clients/' + client.idclient, client);
  }
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(this.host + '/clients/' + id);
  }
}
