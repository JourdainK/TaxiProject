import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../../entities/locations.entities";
import {LocationsService} from "../../services/locations.service";
import {TaxisService} from "../../services/taxis.service";
import {AddressesService} from "../../services/addresses.service";
import {Adresse} from "../../entities/addresses.entities";
import {Taxi} from "../../entities/taxis.entities";
import {Client} from "../../entities/clients.entities";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.css']
})

export class EditlocationComponent implements OnInit{
  locationFormGroup?: FormGroup;
  submitted = false;
  idlocation: number;
  locations?: Location[];
  addresses?: Adresse[];
  taxis?: Taxi[];
  clients?: Client[];
  loc?: Location;

  constructor(private fb: FormBuilder, private LocationService: LocationsService,
              private adresseService: AddressesService, private taxiService: TaxisService,
              private clientService: ClientsService,
              activatedRoute: ActivatedRoute) {
    this.idlocation = activatedRoute.snapshot.params.idlocation;
  }
  ngOnInit(): void {

    this.LocationService.getLocation(this.idlocation).subscribe(
      location => {
        this.loc = location;
        //console.log(this.location);
      }
    );

    this.taxiService.getAllTaxis().subscribe(taxis => {
      this.taxis = taxis;
    });

    this.adresseService.getAllAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });

    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });

    this.LocationService.getLocation(this.idlocation).subscribe(
      location => {
        this.locationFormGroup = this.fb.group({
          idlocation : [location.idlocation, Validators.required],
          dateloc : [location.dateloc, Validators.required],
          kmtotal : [location.kmtotal, Validators.required],
          nbrpassagers : [location.nbrpassagers, Validators.required],
          total : [location.total, Validators.required],
          taxi : [location.taxi, Validators.required],
          client : [location.client, Validators.required],
          adressedep : [location.adressedep, Validators.required],
          adressearr : [location.adressearr, Validators.required]
        })
      });
  }

  onUpdateLocation(): void {
    this.submitted = true;
    if (this.locationFormGroup?.invalid) {
      return;
    }

    // Get the selected Taxi, Adresse, and Client objects
    const selectedTaxiId = this.locationFormGroup?.get('taxi')?.value;
    const selectedAdressedepId = this.locationFormGroup?.get('adressedep')?.value;
    const selectedAdressearrId = this.locationFormGroup?.get('adressearr')?.value;
    const selectedClientId = this.locationFormGroup?.get('client')?.value;

    this.taxiService.getTaxi(selectedTaxiId).subscribe(selectedTaxi => {
      this.adresseService.getAdresse(selectedAdressedepId).subscribe(selectedAdressedep => {
        this.adresseService.getAdresse(selectedAdressearrId).subscribe(selectedAdressearr => {
          this.clientService.getClient(selectedClientId).subscribe(selectedClient => {

            // Replace the id with the entire object
            this.locationFormGroup?.patchValue({
              taxi: selectedTaxi,
              adressedep: selectedAdressedep,
              adressearr: selectedAdressearr,
              client: selectedClient
            });

            this.LocationService.updateLocation(this.locationFormGroup?.value).subscribe(data => {
                alert('Location\'s update is successful');
                window.location.reload();
              },
              err => {
                alert(err.headers.get("error"));
              });
          });
        });
      });
    });
  }

  onSeeLocation=(l: Location)=>{
    this.LocationService.getLocation(l.idlocation).subscribe(
      data => {
        this.locations = [data];
      }
    );
  }

  protected readonly location = location;
}
