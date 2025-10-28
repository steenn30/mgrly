import './style.css'
import { createMissionSection } from './Mainpage/Mission.ts'
import { createManagerInfo } from './PPV/ManagerInfo.ts'
import { createCompaniesAlphabetized } from './Search/CompaniesAlphabetized.ts'
import { createManagersAlphabetized } from './Search/Managers.ts'
import { createSearchBar } from './Search/SearchBar.ts'
import { createManager, createReview, loadManagers, saveManagers } from './store.ts'
import type { Manager, NewManagerInput } from './types.ts'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('App container not found')
}

let managers: Manager[] = loadManagers()
let selectedCompany = ''

const layout = document.createElement('div')
layout.className = 'layout'

const heroSection = createMissionSection({
  onCreateManager: handleCreateManager,
})

const searchContainer = document.createElement('section')
searchContainer.className = 'panel'

const managersContainer = document.createElement('section')
managersContainer.className = 'manager-grid'

const sidebar = document.createElement('aside')
sidebar.className = 'sidebar'

layout.append(heroSection, searchContainer, managersContainer, sidebar)
app.replaceChildren(layout)

render()

function handleCreateManager(input: NewManagerInput): void {
  const manager = createManager(input)
  managers = [...managers, manager]
  saveManagers(managers)
  selectedCompany = manager.company
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
  renderSearch()
  renderManagers()
  renderSidebar()
}

function renderSearch(): void {
  const companies = Array.from(new Set(managers.map((manager) => manager.company.trim()).filter(Boolean)))
  const searchBar = createSearchBar({
    companies,
    selectedCompany,
    onFilterChange: (company) => {
      selectedCompany = company
      renderManagers()
    },
  })

  searchContainer.replaceChildren(searchBar)
}

function renderManagers(): void {
  const filtered = selectedCompany
    ? managers.filter((manager) => manager.company.toLowerCase() === selectedCompany.toLowerCase())
    : managers

  if (filtered.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'empty-state'
    empty.textContent =
      selectedCompany
        ? `No managers found for “${selectedCompany}”. Try another company or add a new manager.`
        : 'No managers yet. Use the form above to share someone great.'
    managersContainer.replaceChildren(empty)
    return
  }

  const cards = filtered
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((manager) =>
      createManagerInfo({
        manager,
        onCreateReview: handleCreateReview,
      }),
    )

  managersContainer.replaceChildren(...cards)
}

function renderSidebar(): void {
  const companiesList = createCompaniesAlphabetized(managers)
  const managersList = createManagersAlphabetized(managers)
  sidebar.replaceChildren(companiesList, managersList)
}
