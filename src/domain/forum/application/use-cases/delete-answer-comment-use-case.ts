import { Either, left, right } from '@/core/either/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { NotAllowedError } from './erros/not-allowed-error'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  unknown
>

export class DeleteCommentAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId: answerId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
