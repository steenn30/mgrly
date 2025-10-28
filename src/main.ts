import './style.css'
import { createMissionSection } from './Mainpage/Mission.ts'
import { createManagerInfo } from './PPV/ManagerInfo.ts'
import { createReview, loadManagers, saveManagers } from './store.ts'
import type { Manager } from './types.ts'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('App container not found')
}

let managers: Manager[] = loadManagers()
let query = ''

const shell = document.createElement('div')
shell.className = 'app-shell'

const landing = createMissionSection({
  selectedQuery: query,
  onSearch: handleSearch,
})

const results = document.createElement('section')
results.className = 'results'

shell.append(landing.element, results)
app.replaceChildren(shell)

render()

function handleSearch(nextQuery: string): void {
  query = nextQuery
  render()
}

function handleCreateReview(managerId: string, rating: number, summary: string): void {
  managers = managers.map((manager) => {
    if (manager.id !== managerId) {
      return manager
    }

    const review = createReview(managerId, rating, summary)
    return {
      ...manager,
      reviews: [...manager.reviews, review],
    }
  })

  saveManagers(managers)
  render()
}

function render(): void {
  landing.setSearchValue(query)

  const trimmed = query.trim().toLowerCase()
  if (!trimmed) {
    const empty = document.createElement('div')
    empty.className = 'results__placeholder'
    empty.innerHTML = `
      <p>Type a company or manager name to surface neon-bright reviews.</p>
    `
    results.replaceChildren(empty)
    return
  }

  const filtered = managers
    .filter((manager) => {
      const company = manager.company.toLowerCase()
      const name = manager.name.toLowerCase()
      return company.includes(trimmed) || name.includes(trimmed)
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  if (filtered.length === 0) {
    const empty = document.createElement('div')
    empty.className = 'results__placeholder'
    empty.innerHTML = `
      <p>No matches for “${query.trim()}”. Try another search.</p>
    `
    results.replaceChildren(empty)
    return
  }

  const cards = filtered.map((manager) =>
    createManagerInfo({
      manager,
      onCreateReview: handleCreateReview,
    }),
  )

  results.replaceChildren(...cards)
}
