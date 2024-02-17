import { Entity } from '../../core/entities/Entity';
import { Slug } from './value-objects/Slug';

interface QuestionProps {
  title: string;
  authorId: string;
  content: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {}
