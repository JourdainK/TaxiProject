import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AddressesService } from "../../services/addresses.service";
import { Adresse } from "../../entities/addresses.entities";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newaddress',
  templateUrl: './newaddress.component.html',
  styleUrl: './newaddress.component.css'
})
export class NewaddressComponent implements OnInit{
  adresseFormGroup?: FormGroup;
  submitted = false;
  idadresse:number|null = null;

  constructor(private fb: FormBuilder, private addressService: AddressesService, private router: Router) { }
    ngOnInit(): void {
    this.adresseFormGroup = this.fb.group({
      cp: ["", Validators.required, Validators.min(1000), Validators.max(9999)],
      localite: ["", Validators.required],
      rue: ["", Validators.required],
      numero: ["", Validators.required],

    });

  }

  onSaveAddress(){
    this.submitted = true;
    if(this.adresseFormGroup?.invalid) { return; }

    this.addressService.createAdresse(this.adresseFormGroup?.value).subscribe(data =>{
      console.log(data);
      alert("New address saved");this.idadresse = data.idadresse},
        err => {
        alert(err.headers.get("error"));
        console.log('error')
    });
  }

}
