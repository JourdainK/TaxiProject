import {Taxi} from "./taxis.entities";
import {Client} from "./clients.entities";
import {Adresse} from "./addresses.entities";

export interface Location {

  idlocation: number;

  dateloc: string;

  kmtotal: number;

  nbrpassagers: number;

  total: number;

  taxi: Taxi;

  client: Client;

  adressedep: Adresse;

  adressearr: Adresse;
}
