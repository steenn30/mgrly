import type { Manager } from '../types.ts'

export function createCompaniesAlphabetized(managers: Manager[]): HTMLElement {
  const section = document.createElement('section')
  section.className = 'alphabetized-list'
  section.innerHTML = `<h3>Companies A–Z</h3>`

  const list = document.createElement('ol')
  list.className = 'alphabetized-list__items'

  const uniqueCompanies = Array.from(new Set(managers.map((manager) => manager.company.trim()))).filter(
    (company) => company.length > 0,
  )

  uniqueCompanies
    .sort((a, b) => a.localeCompare(b))
    .forEach((company) => {
      const item = document.createElement('li')
      item.textContent = company
      list.append(item)
    })

  if (uniqueCompanies.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'alphabetized-list__empty'
    empty.textContent = 'No companies yet. Add a manager to get started.'
    section.append(empty)
  } else {
    section.append(list)
  }

  return section
}
