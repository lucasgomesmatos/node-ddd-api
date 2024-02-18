import { Entity } from '../../core/entities/Entity';
import { UniqueEntityId } from '../../core/entities/UniqueEntityId';

interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this.props.content;
  }
}
