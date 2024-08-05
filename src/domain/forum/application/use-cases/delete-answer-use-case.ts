import { Either, left, right } from '@/core/either/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './erros/not-allowed-error'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  unknown
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
