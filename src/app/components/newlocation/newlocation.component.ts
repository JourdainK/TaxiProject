import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationsService} from '../../services/locations.service';
import {Location} from '../../entities/locations.entities';
import {AddressesService} from "../../services/addresses.service";
import {Adresse} from "../../entities/addresses.entities";
import {TaxisService} from "../../services/taxis.service";
import {Taxi} from "../../entities/taxis.entities";
import {Client} from "../../entities/clients.entities";
import {ClientsService} from "../../services/clients.service";
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
  this.taxiService.getAllTaxis().subscribe(taxis => {
    this.taxis = taxis;
  });

  this.adresseService.getAllAddresses().subscribe(addresses => {
    this.addresses = addresses;
  });

    this.locationFormGroup = this.fb.group({
      dateloc: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      kmtotal: [0, Validators.required],
      nbrpassagers: [0, Validators.required],
      taxi: [0, Validators.required],
      adressedep: [0, Validators.required],
      adressearr: [0, Validators.required]
    });
}


  onSaveLocation(): void {
    this.submitted = true;

    this.taxiService?.getTaxi(this.locationFormGroup?.value.taxi).subscribe(selectedTaxi => {
      this.adresseService?.getAdresse(this.locationFormGroup?.value.adressedep).subscribe(selectedAdressedep => {
        this.adresseService?.getAdresse(this.locationFormGroup?.value.adressearr).subscribe(selectedAdressearr => {


          this.locationFormGroup?.patchValue({
            taxi: selectedTaxi,
            adressedep: selectedAdressedep,
            adressearr: selectedAdressearr
          });

          var newloc = this.locationFormGroup?.value;
          newloc.client = this.cliact?.value;
          if(selectedAdressearr.idadresse == selectedAdressedep.idadresse){
            if(window.confirm("Are you sure you want to save a location with the same departure and arrival address ?")){
              this.locationService.createLocation(newloc).
              subscribe({
                next: data => {
                  alert('sauvegarde ok');
                  this.loc = data;
                  this.newLocation.emit(data);
                },
                error: err => {
                  if (err.headers.get("error").includes('Nombre de passagers trop important pour ce taxi')) {
                    alert(`Error The maximum number of passengers for this taxi is ${this.locationFormGroup?.value.taxi.nbremaxpassagers}`);
                  } else {
                    alert(err.headers.get("error"));
                  }
                }
              });
            }
            else{
              return;
            }

          }
          else{
            this.locationService.createLocation(newloc).
            subscribe({
              next: data => {
                alert('sauvegarde ok');
                this.loc = data;
                this.newLocation.emit(data);
              },
              error: err => {
                if (err.headers.get("error").includes('Nombre de passagers trop important pour ce taxi')) {
                  alert(`Error The maximum number of passengers for this taxi is ${this.locationFormGroup?.value.taxi.nbremaxpassagers}`);
                } else {
                  alert(err.headers.get("error"));
                }
              }
            });
          }
        });
      });
    });
  }
}
