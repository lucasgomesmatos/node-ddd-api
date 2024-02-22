import { Answer } from '../../enterprise/entities/Answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
