import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ClientsService} from "../../services/clients.service";
import {Observable} from "rxjs";
import {Client} from "../../entities/clients.entities";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{
  clients?: Client[];
  constructor(private clientService: ClientsService, private router: Router) {
  }
  ngOnInit(): void {
  }

  onSearch(value: any) {
    this.clientService.getClientByNom(value.nomcli).subscribe({
      next: data => (this.clients = data)
    });
  }

  //TODO
  onNewClient() {
    this.router.navigateByUrl('newClient')
  }

  onDelete(c: Client){
    let v = confirm('Are you sure you want to delete this client ?');
    if(v){
      this.clientService.deleteClient(c.idclient).subscribe({
        next : data => {
          //this.onSearch(c);
          const index = this.clients?.indexOf(c,0);
          //TODO test -> delete if it's working correctly
          alert("index = " + index);
          if(!(index === undefined) && index > -1) {
            this.clients?.splice(index,1);
          }
        },
        error: err => { alert(err.headers.get("error"));
        }
      });
    }
  }

  //TODO develop that later then check
  onEdit(c:Client) {
    this.router.navigateByUrl('updateClient/' + c.idclient);
  }



}
