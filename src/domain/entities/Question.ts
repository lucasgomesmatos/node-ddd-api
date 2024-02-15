import { randomUUID } from 'node:crypto';

type QuestionProps = {
  title: string;
  authorId: string;
  content: string;
};

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public authorId: string;

  constructor(props: Question, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.id = id ?? randomUUID();
  }
}
