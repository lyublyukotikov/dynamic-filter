import { Project } from './Project';
import { Room } from './Room';
import { Price } from './Price';
import { Square } from './Square';

export interface Filters {
  projects: Project[];
  rooms: Room[];
  price: Price;
  square: Square;
}
