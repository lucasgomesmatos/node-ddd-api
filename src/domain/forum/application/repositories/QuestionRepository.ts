import { Question } from '../../enterprise/entities/Question'

export interface QuestionRepository {
  create(question: Question): Promise<void>
}
