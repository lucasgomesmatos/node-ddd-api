import { Either, left, right } from '@/core/either/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './erros/not-allowed-error'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  unknown
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right({})
  }
}
