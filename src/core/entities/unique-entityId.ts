import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private _value: string

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }

  toString(): string {
    return this._value
  }

  toValue(): string {
    return this._value
  }

  get value(): string {
    return this._value
  }
}
