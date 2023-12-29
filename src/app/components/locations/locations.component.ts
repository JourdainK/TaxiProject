import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LocationsService} from "../../services/locations.service";
import {Location} from "../../entities/locations.entities";
import {Observable} from "rxjs";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit{
  Locations?: Location[];

  constructor(private locationService: LocationsService, private router: Router) {

  }
    ngOnInit(): void {

    }
  onSearch(value: any) {
    if (value.idlocation) {
      this.locationService.getLocation(value.idlocation).subscribe({
        next:data=>{
          if(!this.Locations){
            this.Locations=[];
          }
          this.Locations[0]=data;
        }
      });
  } else {
      this.locationService.getAllLocations().subscribe({
        next: data => {
          this.Locations = data;
        }
      });
    }
  }

    onEdit(l: Location) {
      this.router.navigateByUrl('editLocation/' + l.idlocation);
    }

    onDelete(l: Location){
      let v = confirm('Are you sure you want to delete this location ?');
      if(v){
        this.locationService.deleteLocation(l.idlocation).subscribe({
          next : data => {
            //this.onSearch(c);
            const index = this.Locations?.indexOf(l,0);
            alert("Location deleted successfully");
            if(!(index === undefined) && index > -1) {
              this.Locations?.splice(index,1);
            }
          },
          error: err => { alert(err.headers.get("error"));
          }
        });
      }
    }

    onSeeAllLocations(){
      this.locationService.getAllLocations().subscribe({
        next: data => {
          this.Locations = data;
        }
      });
    }

    onNewLocation() {
      this.router.navigateByUrl('newLocation/')
    }

}
