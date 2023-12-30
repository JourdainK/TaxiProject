import {Component, OnInit} from '@angular/core';
import {TaxisService} from "../../services/taxis.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newtaxi',
  templateUrl: './newtaxi.component.html',
  styleUrls: ['./newtaxi.component.css']
})
export class NewtaxiComponent implements OnInit{
  taxiFormGroup?: FormGroup;
  submitted = false;
  idtaxi:number|null = null;
    constructor(private fb: FormBuilder, private taxiService: TaxisService) {
    }

    ngOnInit(): void {
      this.taxiFormGroup = this.fb.group({
        nbremaxpassagers: ["", Validators.required],
        immatriculation: ["", [Validators.required, Validators.pattern('^[T]{1}\-([L]{1}||[X]{1})[A-Z]{2}\-[0-9]{3}$')]],
        prixkm: ["", Validators.required]
      });
    }


    onSaveTaxi() {
      this.submitted = true;
      if(this.taxiFormGroup?.invalid) { return; }

      this.taxiService.createTaxi(this.taxiFormGroup?.value).subscribe(data =>{
        alert("New taxi saved");this.idtaxi = data.idtaxi},
          err => {
          alert(err.headers.get("error"));
          console.log('error')
          });
    }
}
