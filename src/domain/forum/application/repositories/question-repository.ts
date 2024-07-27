import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  findById(questionId: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}
