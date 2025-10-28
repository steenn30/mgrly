import { createManagerMetadata } from './ManagerMetadata.ts'
import { createReviewBox } from './ReviewBox.ts'
import { createReviewsList } from './Reviews.ts'
import type { Manager } from '../types.ts'

interface ManagerInfoOptions {
  manager: Manager
  onCreateReview: (managerId: string, rating: number, summary: string) => void
}

export function createManagerInfo({ manager, onCreateReview }: ManagerInfoOptions): HTMLElement {
  const article = document.createElement('article')
  article.className = 'manager-card'

  const header = document.createElement('header')
  header.className = 'manager-card__header'
  header.innerHTML = `
    <h2>${manager.name}</h2>
  `

  const meta = createManagerMetadata(manager)
  const reviewsList = createReviewsList(manager.reviews)
  const reviewForm = createReviewBox({
    onSubmit: (rating, summary) => onCreateReview(manager.id, rating, summary),
  })

  const reviewsSection = document.createElement('section')
  reviewsSection.className = 'manager-card__reviews'
  reviewsSection.append(reviewsList, reviewForm)

  article.append(header, meta, reviewsSection)
  return article
}
