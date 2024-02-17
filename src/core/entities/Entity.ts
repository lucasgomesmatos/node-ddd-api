import { UniqueEntityId } from './UniqueEntityId';

export abstract class Entity<T> {
  private _id: UniqueEntityId;
  protected props: T;

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = new UniqueEntityId(id);
  }

  get id() {
    return this._id;
  }
}
