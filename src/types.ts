export interface Review {
  id: string
  rating: number
  summary: string
  createdAt: string
}

export interface Manager {
  id: string
  name: string
  company: string
  role: string
  createdAt: string
  reviews: Review[]
}

export interface NewManagerInput {
  name: string
  company: string
  role: string
}

export interface NewReviewInput {
  rating: number
  summary: string
}
