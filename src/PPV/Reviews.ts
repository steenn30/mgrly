import type { Review } from '../types.ts'

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function createReviewsList(reviews: Review[]): HTMLElement {
  const list = document.createElement('ul')
  list.className = 'reviews'

  if (reviews.length === 0) {
    const empty = document.createElement('li')
    empty.className = 'reviews__empty'
    empty.textContent = 'Be the first to review this manager.'
    list.append(empty)
    return list
  }

  reviews
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .forEach((review) => {
      const item = document.createElement('li')
      item.className = 'reviews__item'
      item.innerHTML = `
        <div class="reviews__rating" aria-label="Rating">${'★'.repeat(review.rating)}${'☆'.repeat(
        5 - review.rating,
      )}</div>
        <p class="reviews__summary">${review.summary}</p>
        <p class="reviews__date">${formatDate(review.createdAt)}</p>
      `
      list.append(item)
    })

  return list
}
