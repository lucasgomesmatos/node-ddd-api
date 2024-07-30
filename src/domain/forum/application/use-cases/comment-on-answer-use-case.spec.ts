import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer-use-case'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Create Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('create be able to create a answer comment', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    const { answerComment } = await sut.execute({
      authorId: 'author-id',
      answerId: newAnswer.id.toString(),
      content: 'Answer content',
    })

    expect(answerComment.id).toBeTruthy()
    expect(answerComment.content).toEqual('Answer content')
    expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(
      answerComment.id,
    )
  })

  it('should not be able to create a answer comment if the answer does not exist', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      return await sut.execute({
        answerId: 'invalid-answer-id',
        authorId: 'author-id',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
