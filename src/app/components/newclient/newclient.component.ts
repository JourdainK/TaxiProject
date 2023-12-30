import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,  Validators} from "@angular/forms";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-newclient',
  templateUrl: './newclient.component.html',
  styleUrls: ['./newclient.component.css']
})
export class NewclientComponent implements OnInit{
  clientFormGroup?: FormGroup;
  submitted = false;
  idclient:number|null = null;
  constructor(private fb: FormBuilder, private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      mail: ["", Validators.required],
      nomcli: ["", Validators.required],
      prenomcli: ["", Validators.required],
      tel: ["+32(0)", Validators.required]
    });
  }


  onSaveClient() {
    this.submitted = true;
    if(this.clientFormGroup?.invalid) { return; }

    this.clientService.createClient(this.clientFormGroup?.value).subscribe(data =>{
      console.log(data);
      alert("New client saved");this.idclient = data.idclient},
        err => {
        alert(err.headers.get("error"));
        console.log('error')
        });
  }


}
