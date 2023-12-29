import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { TaxisService } from "../../services/taxis.service";
import { Taxi } from "../../entities/taxis.entities";
import { Observable } from "rxjs";

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrl: './taxis.component.css'
})

export class TaxisComponent implements OnInit{
    Taxis?: Taxi[];

    constructor(private taxiService: TaxisService, private router: Router) {

    }
    ngOnInit(): void {

    }

    onSearch(value: any) {
      if (value.idtaxi) {
        this.taxiService.getTaxi(value.idtaxi).subscribe({
          next:data=>{
            if(!this.Taxis){
              this.Taxis=[];
            }
            this.Taxis[0]=data;
          }
        });
    } else {
        this.taxiService.getAllTaxis().subscribe({
          next: data => {
            this.Taxis = data;
          }
        });
      }
    }

    onEdit(t: Taxi) {
      this.router.navigateByUrl('editTaxi/' + t.idtaxi);
    }

    onDelete(t: Taxi){
      let v = confirm('Are you sure you want to delete this taxi ?');
      if(v){
        this.taxiService.deleteTaxi(t.idtaxi).subscribe({
          next : data => {
            //this.onSearch(c);
            const index = this.Taxis?.indexOf(t,0);
            alert("Taxi deleted successfully");
            if(!(index === undefined) && index > -1) {
              this.Taxis?.splice(index,1);
            }
          },
          error: err => { alert(err.headers.get("error"));
          }
        });
      }
    }

    onNewTaxi(){
      this.router.navigateByUrl('newTaxi/');
    }


}
