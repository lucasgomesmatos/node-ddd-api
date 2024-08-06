import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('create be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-id',
      title: 'Question title',
      content: 'Question content',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
