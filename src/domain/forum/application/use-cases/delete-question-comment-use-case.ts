import { Either, left, right } from '@/core/either/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './erros/not-allowed-error'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface DeleteCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteCommentQuestionUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  unknown
>

export class DeleteCommentQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId: questionId,
  }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== questionComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}
