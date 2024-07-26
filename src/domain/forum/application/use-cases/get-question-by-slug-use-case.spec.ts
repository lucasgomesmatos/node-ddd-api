import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionsRepository } from './../../../../../test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Question title',
      content: 'Question content',
      slug: Slug.create('question-title'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'question-title',
    })

    expect(question.id).toBeTruthy()
    expect(question.authorId).toEqual(newQuestion.authorId)
    expect(question.title).toEqual(newQuestion.title)
    expect(question.content).toEqual(newQuestion.content)
    expect(question.slug.value).toEqual(newQuestion.slug.value)
  })
})
