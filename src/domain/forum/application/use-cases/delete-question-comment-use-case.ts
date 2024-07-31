import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteCommentQuestionUseCaseResponse {}

export class DeleteCommentQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId: questionId,
  }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionId)

    if (!questionComment) {
      throw new Error('Question not found')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not authorized')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
