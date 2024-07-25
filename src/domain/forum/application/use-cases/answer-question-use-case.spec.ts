import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question-use-case'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  test('create be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      content: 'Answer content',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('Answer content')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
