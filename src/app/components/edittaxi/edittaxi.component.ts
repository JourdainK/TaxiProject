import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Taxi} from "../../entities/taxis.entities";
import {TaxisService} from "../../services/taxis.service";
import {LocationsService} from "../../services/locations.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../../entities/locations.entities";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-edittaxi',
  templateUrl: './edittaxi.component.html',
  styleUrls: ['./edittaxi.component.css']
})
export class EdittaxiComponent implements OnInit {

  taxiFormGroup?: FormGroup;
  submitted = false;
  idtaxi: number;
  taxis?: Taxi[];
  locations?: Location[];


  constructor(private fb: FormBuilder, private taxiService: TaxisService,
              private locationService: LocationsService,
              activatedRoute: ActivatedRoute) {
    this.idtaxi = activatedRoute.snapshot.params.idtaxi;
  }

  ngOnInit(): void {

    this.taxiService.getTaxi(this.idtaxi).subscribe(
      taxi => {
        this.taxiFormGroup = this.fb.group({
          idtaxi: [taxi.idtaxi, Validators.required],
          nbremaxpassagers: [taxi.nbremaxpassagers, Validators.required],
          immatriculation: [taxi.immatriculation, [Validators.required, Validators.pattern('^[T]{1}\-([L]{1}||[X]{1})[A-Z]{2}\-[0-9]{3}$')]],
          prixkm: [taxi.prixkm, Validators.required]
        })
      });
  }

  onSeeLocations(){
    this.taxiService.getTaxi(this.idtaxi).subscribe(
      taxi => {
        this.locationService.getLocationByTaxi(taxi).subscribe(
          data => {
            this.locations = data;
          }
        );
      }
    );
  }

  onSeeLocationBetweenDates(){
    this.taxiService.getTaxi(this.idtaxi).subscribe(
      taxi => {
        let date1 = this.taxiFormGroup?.get('datestart')?.value;
        let date2 = this.taxiFormGroup?.get('dateend')?.value;

        let formatedDate1 = formatDate(date1, 'yyyy-MM-dd', 'en');
        let formatedDate2 = formatDate(date2, 'yyyy-MM-dd', 'en');
        console.log("formatedDate1 : " + formatedDate1);
        this.taxiService.getLocationsBetween(taxi.idtaxi, formatedDate1, formatedDate2).subscribe(
          data => {
            this.locations = data;
          }
        );
      }
    );
  }

  onUpdateTaxi(): void {
    this.submitted = true;
    if (this.taxiFormGroup?.invalid) {
      return;
    }
    this.taxiService.updateTaxi(this.taxiFormGroup?.value).subscribe(data => {
        alert('Taxi\'s update is successful');
        window.location.reload();
      },
      err => {
        alert(err.headers.get("error"));
      });
  }


}

