import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerCreateEvent } from '@/domain/forum/enterprise/events/answer-created-event'

export class OnAnswerCreatedSubscriber implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreateEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreateEvent) {
    console.log(answer)
  }
}
