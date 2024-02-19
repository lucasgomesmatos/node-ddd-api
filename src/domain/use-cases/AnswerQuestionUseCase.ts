import { UniqueEntityId } from '../../core/entities/UniqueEntityId';
import { Answer } from '../entities/Answer';
import { AnswersRepository } from '../repositories/AnswersRepository';

type AnswerQuestionUseCaseRequest = {
  questionId: string;
  instructorId: string;
  content: string;
};

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
