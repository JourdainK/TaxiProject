import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Adresse} from "../../entities/addresses.entities";
import {AddressesService} from "../../services/addresses.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css']
})
export class EditaddressComponent implements OnInit {
  addressFormGroup?: FormGroup;
  submitted = false;
  idadresse: number;
  adresse?: Adresse;


  constructor(private fb: FormBuilder, private addresseService: AddressesService
  , activatedRoute: ActivatedRoute) {
    this.idadresse = activatedRoute.snapshot.params.idadresse;
  }

  ngOnInit(): void {
    this.addresseService.getAdresse(this.idadresse).subscribe(
      adresse => {
        this.addressFormGroup = this.fb.group({
          idadresse: [adresse.idadresse],
          cp: [adresse.cp, [Validators.required, Validators.min(1000), Validators.max(9999)]],
          localite: [adresse.localite, Validators.required],
          rue: [adresse.rue, Validators.required],
          num: [adresse.num, Validators.required]
        })
      });
  }

  onUpdateAddress() {
    this.submitted = true;
    if (this.addressFormGroup?.invalid) {
      return;
    }
    this.addresseService.updateAddress(this.addressFormGroup?.value).subscribe(data => {
        alert('Address\'s update is successful');
      },
      err => {
        alert(err.headers.get("error"));
      });
  }

}
