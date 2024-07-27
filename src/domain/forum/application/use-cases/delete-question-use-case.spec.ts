import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from './../../../../../test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { DeleteQuestionUseCase } from './delete-question-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('create be able to delete a question', async () => {
    const expectedId = 'question-id'
    const newQuestion = makeQuestion({}, new UniqueEntityId(expectedId))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: expectedId,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
