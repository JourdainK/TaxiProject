import {Location} from './locations.entities';

export interface Taxi {
  idtaxi: number;
  immatriculation: string;
  nbremaxpassagers: number;
  prixkm: number;
  llocs : Location[];
}
