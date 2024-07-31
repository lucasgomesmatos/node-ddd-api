import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteCommentQuestionUseCase } from './delete-question-comment-use-case'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteCommentQuestionUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommentQuestionUseCase(inMemoryQuestionCommentsRepository)
  })

  it('delete be able to question comment', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-id'),
    })

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({
      authorId: 'author-id',
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment if the question comment does not exist', async () => {
    expect(async () => {
      return await sut.execute({
        authorId: 'author-id',
        questionCommentId: 'invalid-question-comment-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a question comment if different author', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-id'),
    })

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    expect(async () => {
      return await sut.execute({
        authorId: 'invalid-author-id',
        questionCommentId: newQuestionComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
