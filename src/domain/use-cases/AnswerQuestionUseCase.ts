import { Answer } from '../entities/Answer';

type AnswerQuestionUseCaseRequest = {
  questionId: string;
  instructorId: string;
  content: string;
};

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId,
    });

    return answer;
  }
}
