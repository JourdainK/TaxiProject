import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ClientsComponent} from './components/clients/clients.component';
import {TaxisComponent} from "./components/taxis/taxis.component";
import {LocationsComponent} from "./components/locations/locations.component";
import {AddressesComponent} from "./components/addresses/addresses.component";
import {NewclientComponent} from "./components/newclient/newclient.component";
//put all the routes here


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'taxis', component: TaxisComponent},
  {path: 'locations', component: LocationsComponent},
  {path :'addresses', component: AddressesComponent},
  {path : "newClient", component: NewclientComponent},
  //wildcard route, redirect to home, if the user types a wrong url
  {path: '**', redirectTo: ''}
  //tested and working
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
