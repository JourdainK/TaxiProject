import {Taxi} from "./taxis.entities";
import {Client} from "./clients.entities";
import {Adresse} from "./addresses.entities";

export interface Location {
  /**
   * Represents the ID of a location.
   *
   * @typedef {number} idlocation
   */
  idlocation: number;
  /**
   * Represents the location of a date.
   *
   * @typedef {string} DateLoc
   * @description The `dateloc` variable is a string that represents the date of a location
   */
  dateloc: string;
  /**
   * Represents the total kilometers.
   *
   * @type {number}
   */
  kmtotal: number;
  /**
   * Represents the number of passengers.
   *
   * @typedef {number} nbrpassagers
   */
  nbrpassagers: number;
  /**
   * The total number, cost of the location.
   *
   * @typedef {number} total
   */
  total: number;
  /**
   * Taxi object representing a taxi.
   */
  taxi: Taxi;
  /**
   * Represents a client.
   * @class
   */
  client: Client;
  /**
   * Represents an address object.
   * Starting point of the location.
   *
   */
  adressedep: Adresse;
  /**
   * Represents an Adresse object.
   * Final destination of the location.
   *
   */
  adressearr: Adresse;
}
