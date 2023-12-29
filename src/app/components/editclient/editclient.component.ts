import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ClientsService} from "../../services/clients.service";
import {LocationsService} from "../../services/locations.service";
import {Location} from "../../entities/locations.entities";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})

export class EditclientComponent implements OnInit{
  clientFormGroup?: FormGroup;
  submitted = false;
  idclient: number;
  locations?: Location[];


  constructor(private fb: FormBuilder, private clientService: ClientsService,
              private locationService: LocationsService ,
              activatedRoute: ActivatedRoute) {
    this.idclient = activatedRoute.snapshot.params.idclient;

  }

  ngOnInit(): void {
    this.clientService.getClient(this.idclient).subscribe(
      client => {
        this.clientFormGroup = this.fb.group({
          idclient: [client.idclient, Validators.required],
          nomcli: [client.nomcli, Validators.required],
          prenomcli: [client.prenomcli, Validators.required],
          mail: [client.mail, Validators.required],
          tel: [client.tel, Validators.required]
        })
      });
  }

  onUpdateClient(): void {
    this.submitted = true;
    if (this.clientFormGroup?.invalid) {
      return;
    }
    this.clientService.updateClient(this.clientFormGroup?.value).subscribe(data => {
        alert('Client\'s update is successful');
      },
      err => {
        alert(err.headers.get("error"));
      });
  }

  onSeeLocations(){
    //get client by his id
    this.clientService.getClient(this.idclient).subscribe(
      client => {
        this.locationService.getLocationByClient(client).subscribe(
          data => {
            this.locations = data;
          },
          err => {
            alert(err.headers.get("error"));
          }
        );
      },
      err => {
        alert(err.headers.get("error"));
      }
    );
  }

  onAddLocation(location: Location){
    this.locations?.push(location);
  }

  protected readonly location = location;
}
