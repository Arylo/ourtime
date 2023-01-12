import { People } from "./People";
import { World } from "./World";
import { Year } from "./Year";

export interface Store {
  peoples: People[],
  worlds: World[],
  years: Year[],
}
