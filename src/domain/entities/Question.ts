import { Entity } from '../../core/entities/Entity';
import { UniqueEntityId } from '../../core/entities/UniqueEntityId';
import { Optional } from '../../core/types/optinal';
import { Slug } from './value-objects/Slug';

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return question;
  }
}
