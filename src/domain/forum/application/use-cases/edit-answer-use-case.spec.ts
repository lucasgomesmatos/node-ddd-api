import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer-use-case'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const expectedId = 'answer-id'
    const expectedAuthorId = 'author-id'
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(expectedAuthorId),
      },
      new UniqueEntityId(expectedId),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: expectedId,
      authorId: expectedAuthorId,
      content: 'new content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'new content',
    })
  })

  it('should not be able to edit a answer if the authorId is different', async () => {
    const expectedId = 'answer-id'

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('another-author-id'),
      },
      new UniqueEntityId(expectedId),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      return await sut.execute({
        answerId: expectedId,
        authorId: 'author-id',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
