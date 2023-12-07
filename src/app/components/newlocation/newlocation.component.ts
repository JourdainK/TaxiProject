import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationsService} from '../../services/locations.service';
import {Location} from '../../entities/locations.entities';
import {AddressesService} from "../../services/addresses.service";
import {Adresse} from "../../entities/addresses.entities";
import {TaxisService} from "../../services/taxis.service";
import {Taxi} from "../../entities/taxis.entities";
import {ActivatedRoute} from '@angular/router';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-newlocation',
  templateUrl: './newlocation.component.html',
  styleUrls: ['./newlocation.component.css']
})
export class NewlocationComponent implements OnInit{
  @Input() cliact?: FormGroup;
  @Output() newLocation = new EventEmitter<Location>();
  locationFormGroup?: FormGroup;
  submitted = false;
  loc?: Location;
  addresses?: Adresse[];
  taxis?: Taxi[];

  constructor(private fb: FormBuilder, private locationService: LocationsService,
              private adresseService: AddressesService, private taxiService: TaxisService,
              activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.locationFormGroup = this.fb.group({
      dateloc: [formatDate(new Date(), 'yyyy-MM-dd', 'en')]
    });

    this.taxiService.getAllTaxis().subscribe(taxis => {
      this.taxis = taxis;
    });

    this.adresseService.getAllAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  onSaveLocation(): void {
    this.submitted = true;
    var clt = this.cliact?.value;
    clt.client = this.cliact?.value;
    this.locationService.createLocation(this.locationFormGroup?.value).
      subscribe({
        next: data => {
          alert('sauvegarde ok');
          this.loc = data;
          this.newLocation.emit(data);
        },
        error: err => {
          alert(err.headers.get("error"));
        }
    })
  }

  //TODO check if it works
}
