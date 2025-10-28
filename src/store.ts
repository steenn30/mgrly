import type { Manager, NewManagerInput, Review } from './types.ts'

const STORAGE_KEY = 'mgrly.managers'

const SAMPLE_MANAGERS: Manager[] = [
  {
    id: 'm-avery-johnson',
    name: 'Avery Johnson',
    company: 'Northwind Logistics',
    role: 'Engineering Manager',
    createdAt: new Date('2023-05-17').toISOString(),
    reviews: [
      {
        id: 'r-avery-1',
        rating: 5,
        summary: 'Coaches with context and celebrates the whole team. Sprint reviews feel like pep rallies in the best way.',
        createdAt: new Date('2024-09-03').toISOString(),
      },
      {
        id: 'r-avery-2',
        rating: 4,
        summary: 'Sets a high bar for quality but will roll up their sleeves when deadlines get tight.',
        createdAt: new Date('2024-11-11').toISOString(),
      },
    ],
  },
  {
    id: 'm-dakota-rivers',
    name: 'Dakota Rivers',
    company: 'Brightwave Studios',
    role: 'Design Director',
    createdAt: new Date('2022-03-04').toISOString(),
    reviews: [
      {
        id: 'r-dakota-1',
        rating: 3,
        summary: 'Visionary ideas and thoughtful critique, though timelines sometimes slip when creative sparks fly.',
        createdAt: new Date('2023-07-19').toISOString(),
      },
    ],
  },
]

function cloneManagers(list: Manager[]): Manager[] {
  return list.map((manager) => ({
    ...manager,
    reviews: manager.reviews.map((review) => ({ ...review })),
  }))
}

export function loadManagers(): Manager[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return cloneManagers(SAMPLE_MANAGERS)
    }
    const parsed = JSON.parse(raw) as Manager[]
    if (!Array.isArray(parsed)) {
      return cloneManagers(SAMPLE_MANAGERS)
    }
    return cloneManagers(parsed)
  } catch (error) {
    console.warn('Unable to load stored managers, falling back to defaults.', error)
    return cloneManagers(SAMPLE_MANAGERS)
  }
}

export function saveManagers(managers: Manager[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(managers))
  } catch (error) {
    console.warn('Unable to save managers to localStorage.', error)
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function createId(prefix: string, seed: string): string {
  const slug = slugify(seed)
  const randomSuffix = Math.random().toString(36).slice(2, 7)
  return `${prefix}-${slug}-${randomSuffix}`
}

export function createManager(input: NewManagerInput): Manager {
  const now = new Date().toISOString()
  return {
    id: createId('m', `${input.name}-${input.company}`),
    name: input.name.trim(),
    company: input.company.trim(),
    role: input.role.trim(),
    createdAt: now,
    reviews: [],
  }
}

export function createReview(managerId: string, rating: number, summary: string): Review {
  return {
    id: createId('r', `${managerId}-${rating}`),
    rating,
    summary: summary.trim(),
    createdAt: new Date().toISOString(),
  }
}
