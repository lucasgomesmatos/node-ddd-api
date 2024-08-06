import { makeQuestion } from 'test/factories/make-question'

import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question-use-case'
import { NotAllowedError } from './erros/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const expectedId = 'question-id'
    const expectedAuthorId = 'author-id'
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId(expectedAuthorId),
      },
      new UniqueEntityId(expectedId),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: expectedId,
      authorId: expectedAuthorId,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question if the authorId is different', async () => {
    const expectedId = 'question-id'

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('another-author-id'),
      },
      new UniqueEntityId(expectedId),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: expectedId,
      authorId: 'author-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
