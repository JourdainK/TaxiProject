import {Location} from './locations.entities';
export interface Client {
  idclient: number;
  mail : string;
  nomcli: string;
  prenomcli: string;
  tel: string;
  llocations : Location[];
}
//list of locations in array : multiple locations per client
