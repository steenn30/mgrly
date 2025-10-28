import type { Manager } from '../types.ts'

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getAverageRating(manager: Manager): string {
  if (manager.reviews.length === 0) {
    return 'No ratings yet'
  }
  const sum = manager.reviews.reduce((total, review) => total + review.rating, 0)
  const average = sum / manager.reviews.length
  return `${average.toFixed(1)} / 5` + ` · ${manager.reviews.length} review${manager.reviews.length > 1 ? 's' : ''}`
}

export function createManagerMetadata(manager: Manager): HTMLElement {
  const container = document.createElement('div')
  container.className = 'manager-card__meta'

  const role = document.createElement('p')
  role.className = 'manager-card__role'
  role.textContent = manager.role

  const company = document.createElement('p')
  company.className = 'manager-card__company'
  company.textContent = manager.company

  const since = document.createElement('p')
  since.className = 'manager-card__since'
  since.textContent = `Added ${formatDate(manager.createdAt)}`

  const rating = document.createElement('p')
  rating.className = 'manager-card__rating'
  rating.textContent = getAverageRating(manager)

  container.append(role, company, since, rating)
  return container
}
