import {Component, OnInit} from '@angular/core';
import {Adresse} from "../../entities/addresses.entities";
import {Router} from "@angular/router";
import {AddressesService} from "../../services/addresses.service";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent implements OnInit{
  Adresses?: Adresse[];
  constructor(private addressService: AddressesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSearch(value: any) {
    this.Adresses = [];
    if(value.idadresse){
      this.addressService.getAdresse(value.idadresse).subscribe({
        next:data=>{
          if(!this.Adresses){
            this.Adresses=[];
          }
          this.Adresses[0]=data;
        }
      });
    }else{
      this.addressService.getAllAddresses().subscribe({
        next: data => {
          this.Adresses = data;
        }
      });
    }
  }

  onEdit(a: Adresse) {
     this.router.navigateByUrl('editAddress/' + a.idadresse);
  }

  onDelete(a: Adresse){
    let v = confirm('Are you sure you want to delete this address ?');
    if(v){
      this.addressService.deleteAddress(a.idadresse).subscribe({
        next : data => {
          //this.onSearch(c);
          const index = this.Adresses?.indexOf(a,0);
          alert("Address deleted successfully");
          if(!(index === undefined) && index > -1) {
            this.Adresses?.splice(index,1);
          }
        },
        error: err => { alert(err.headers.get("error"));
        }
      });
    }
  }

  onNewAddress() {
    this.router.navigateByUrl('newAddress')
  }

}
