import { Answer } from '../entities/Answer'
import { AnswersRepository } from '../repositories/AnswersRepository'
import { AnswerQuestionUseCase } from './AnswerQuestionUseCase'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    // do nothing
  },
}

test('create a new answer for a question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: 'question-id',
    instructorId: 'instructor-id',
    content: 'Answer content',
  })

  expect(answer.content).toEqual('Answer content')
})
