import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

import { CreateQuestionUseCase } from './create-question-use-case'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {
    console.log(question)
  },
}

test('create a new answer for a question', async () => {
  const questionUseCase = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await questionUseCase.execute({
    authorId: 'author-id',
    title: 'Question title',
    content: 'Question content',
  })

  expect(question.content).toEqual('Question content')
})
