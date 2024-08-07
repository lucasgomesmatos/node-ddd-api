import { UniqueEntityId } from './unique-entityId'

export abstract class Entity<T> {
  private _id: UniqueEntityId
  protected props: T

  protected constructor(props: T, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  get id() {
    return this._id
  }
}
