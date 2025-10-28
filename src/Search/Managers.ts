import type { Manager } from '../types.ts'

export function createManagersAlphabetized(managers: Manager[]): HTMLElement {
  const section = document.createElement('section')
  section.className = 'alphabetized-list'
  section.innerHTML = `<h3>Managers A–Z</h3>`

  const list = document.createElement('ol')
  list.className = 'alphabetized-list__items'

  const sortedManagers = managers
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))

  if (sortedManagers.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'alphabetized-list__empty'
    empty.textContent = 'No managers yet. Add one above to start collecting reviews.'
    section.append(empty)
    return section
  }

  sortedManagers.forEach((manager) => {
    const item = document.createElement('li')
    item.innerHTML = `<strong>${manager.name}</strong> <span>${manager.company}</span>`
    list.append(item)
  })

  section.append(list)
  return section
}
