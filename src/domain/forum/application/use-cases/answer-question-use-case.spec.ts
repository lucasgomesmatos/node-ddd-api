import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question-use-case'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('create be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      content: 'Answer content',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
