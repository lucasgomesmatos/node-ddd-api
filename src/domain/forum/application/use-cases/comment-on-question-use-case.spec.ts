import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Create Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('create be able to create a question comment', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const { questionComment } = await sut.execute({
      authorId: 'author-id',
      questionId: newQuestion.id.toString(),
      content: 'Question content',
    })

    expect(questionComment.id).toBeTruthy()
    expect(questionComment.content).toEqual('Question content')
    expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(
      questionComment.id,
    )
  })

  it('should not be able to create a question comment if the question does not exist', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      return await sut.execute({
        questionId: 'invalid-question-id',
        authorId: 'author-id',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
