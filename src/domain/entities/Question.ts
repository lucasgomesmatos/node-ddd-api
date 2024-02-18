import { Entity } from '../../core/entities/Entity';
import { UniqueEntityId } from '../../core/entities/UniqueEntityId';
import { Slug } from './value-objects/Slug';

interface QuestionProps {
  title: string;
  authorId: UniqueEntityId;
  content: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {}
