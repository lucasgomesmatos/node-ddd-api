import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteCommentAnswerUseCaseResponse {}

export class DeleteCommentAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId: answerId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerId)

    if (!answerComment) {
      throw new Error('answer not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not authorized')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
