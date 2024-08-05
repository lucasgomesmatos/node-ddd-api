import { UniqueEntityId } from '@/core/entities/unique-entityId'

import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteCommentAnswerUseCase } from './delete-answer-comment-use-case'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteCommentAnswerUseCase

describe.skip('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommentAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('delete be able to answer comment', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-id'),
    })

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      authorId: 'author-id',
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment if the answer comment does not exist', async () => {
    expect(async () => {
      return await sut.execute({
        authorId: 'author-id',
        answerCommentId: 'invalid-answer-comment-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a answer comment if different author', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-id'),
    })

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    expect(async () => {
      return await sut.execute({
        authorId: 'invalid-author-id',
        answerCommentId: newAnswerComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
