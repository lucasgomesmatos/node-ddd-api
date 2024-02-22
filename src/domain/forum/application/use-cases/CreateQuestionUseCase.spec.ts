import { QuestionRepository } from '../repositories/QuestionRepository';
import { Question } from './../../enterprise/entities/Question';

import { CreateQuestionUseCase } from './CreateQuestionUseCase';

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {
    // do nothing
  },
}

test('create a new answer for a question', async () => {
  const questionUseCase = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await questionUseCase.execute({
    authorId: 'author-id',
    title: 'Question title',
    content: 'Question content',
  })

  expect(question.content).toEqual("Question content")
})
