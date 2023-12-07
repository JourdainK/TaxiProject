import {Location} from './locations.entities';

/**
 * Represents a Taxi.
 * @interface
 */
export interface Taxi {
  /**
   * Represents the unique identifier for a taxi.
   *
   * @type {number}
   */
  idtaxi: number;

  /**
   * Represents the immatriculation of a vehicle.
   *
   * @typedef {string} Immatriculation
   */
  immatriculation: string;

  /**
   * Represents the maximum number of passengers that can be accommodated.
   *
   * @type {number}
   */
  nbremaxpassagers: number;


  /**
   * Represents the price per kilometer.
   *
   * @type {number}
   */
  prixkm: number;

  /**
   * Represents an array of locations.
   * @typedef {Location[]} llocs
   */
  llocs : Location[];
}
