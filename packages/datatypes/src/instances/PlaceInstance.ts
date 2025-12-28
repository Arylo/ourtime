import { match, P } from "ts-pattern";
import { createPlace, Place } from "../types/Place";
import { Story } from "../types/Story";
import { World } from "../types/World";
import { createWorldPlace } from "../types/WorldPlace";

export class PlaceInstance {
  private placeId: Place['id'];

  public get id () {
    return this.placeId;
  }
  public toObject () {
    return this.story.map.places.find(p => p.id === this.placeId)!;
  }

  constructor(private story: Story, private world: World, placeOrId: Place['id'] | Parameters<typeof createPlace>[0] | Place) {
    this.placeId = match(placeOrId)
      .with(P.string, (id) => {
        const existingPlace = this.story.map.places.find(p => p.id === id);
        if (!existingPlace) {
          throw new Error(`Place with id ${id} not found in story map`);
        }
        return existingPlace.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingPlace = this.story.map.places.find(p => p.id === id);
        if (!existingPlace) {
          throw new Error(`Place with id ${id} not found in story map`);
        }
        return existingPlace.id;
      })
      .with({ name: P.string }, (data) => {
        const newPlace = createPlace(data);
        this.story.map.places.push(newPlace);
        return newPlace.id;
      })
      .otherwise(() => {
        throw new Error('Invalid placeOrId parameter');
      });

    const currentPlace = this.toObject();
    if (!currentPlace.locatedId) {
      const worldPlaceExists = this.story.map.worldPlace.some(wp => wp.worldId === this.world.id && wp.placeId === this.id);
      if (!worldPlaceExists) {
        this.story.map.worldPlace.push(createWorldPlace({
          worldId: this.world.id,
          placeId: this.id,
        }));
      }
    }
  }

  public appendSubPlace (data: Omit<Parameters<typeof createPlace>[0], 'locatedId'>) {
    return new PlaceInstance(this.story, this.world, {
      ...data,
      locatedId: this.id,
    });
  }
}
