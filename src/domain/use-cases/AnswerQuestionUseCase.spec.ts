import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './AnswerQuestionUseCase';

test('create a new answer for a question', async () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    questionId: 'question-id',
    instructorId: 'instructor-id',
    content: 'Answer content',
  });

  expect(answer.content).toEqual('Answer content');
});
