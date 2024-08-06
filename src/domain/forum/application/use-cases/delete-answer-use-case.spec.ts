import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer-use-case'
import { NotAllowedError } from './erros/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
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
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer if the authorId is different', async () => {
    const expectedId = 'answer-id'

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('another-author-id'),
      },
      new UniqueEntityId(expectedId),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: expectedId,
      authorId: 'author-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
