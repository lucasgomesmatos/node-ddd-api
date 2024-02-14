import { randomUUID } from 'node:crypto';

export class Question {
  id: string;
  title: string;
  content: string;

  constructor(title: string, content: string, id: string) {
    this.title = title;
    this.content = content;
    this.id = id ?? randomUUID();
  }
}
