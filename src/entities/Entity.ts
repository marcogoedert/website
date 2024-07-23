export class Entity {
  public readonly id: string;

  constructor(id: string) {
    if (!id) {
      throw new Error('Entity ID must be defined');
    }
    this.id = id;
  }
}
