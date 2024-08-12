import { makeAnswer } from 'test/factories/make-answer';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { waitFor } from 'test/utils/wait-for';
import { MockInstance } from 'vitest';
import { SendNotificationUseCase, SendNotificationUseCaseRequest } from '../use-cases/send-notification-use-case';
import { InMemoryAnswerAttachmentRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository';
import { SendNotificationUseCaseResponse } from './../use-cases/send-notification-use-case';
import { OnAnswerCreatedSubscriber } from './on-answer-created-subscriber';

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
[SendNotificationUseCaseRequest], Promise<SendNotificationUseCaseResponse>>

describe('OnAnswerCreatedSubscriber', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()

    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreatedSubscriber(
      inMemoryQuestionsRepository,
      sendNotificationUseCase,
    )
  })

  it('should be able send a notification when a answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

     inMemoryQuestionsRepository.create(question)
     inMemoryAnswersRepository.create(answer)

    await waitFor(async () => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
