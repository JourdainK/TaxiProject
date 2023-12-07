import { Location } from './locations.entities';
/**
 * Represents a Client.
 *
 * @interface Client
 */
export interface Client {
  /**
   * Represents the ID of a client.
   *
   * @typedef {number} idclient
   */
  idclient: number;
  /**
   * @description Represents a variable storing an email address.
   * @type {string}
   */
  mail : string;
  /**
   * Represents the name of a client.
   *
   * @typedef {string} Nomcli
   */
  nomcli: string;
  /**
   * Represents the first name of a client.
   *
   * @type {string}
   */
  prenomcli: string;
  /**
   * Represents a telephone number.
   *
   * @typedef {string} Tel
   */
  tel: string;
  /**
   * Represents an array of locations.
   *
   * @typedef {Object} Location
   *
   * @typedef {Location[]} llocations
   */
  llocations : Location[];
}

