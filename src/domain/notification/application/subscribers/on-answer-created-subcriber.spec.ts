import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository'
import { OnAnswerCreatedSubscriber } from './on-answer-created-subcriber'
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('OnAnswerCreatedSubscriber', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
  })

  it('should be able send a notification when a answer is created', async () => {
    const _onAnswerCreatedSubscriber = new OnAnswerCreatedSubscriber()

    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)
  })
})
