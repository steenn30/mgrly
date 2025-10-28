interface MissionOptions {
  onSearch: (query: string) => void
  selectedQuery: string
}

interface MissionSection {
  element: HTMLElement
  setSearchValue: (value: string) => void
}

export function createMissionSection({
  onSearch,
  selectedQuery,
}: MissionOptions): MissionSection {
  const section = document.createElement('section')
  section.className = 'landing'

  const title = document.createElement('h1')
  title.className = 'landing__title'
  title.textContent = 'mgrly'

  const highlight = document.createElement('span')
  highlight.className = 'landing__highlight'
  title.append(highlight)

  const form = document.createElement('form')
  form.className = 'landing__search'
  form.noValidate = true

  const searchInput = document.createElement('input')
  searchInput.type = 'search'
  searchInput.name = 'query'
  searchInput.placeholder = 'Search managers or companies'
  searchInput.autocomplete = 'off'
  searchInput.value = selectedQuery

  form.append(searchInput)

  const handleSearch = () => {
    onSearch(searchInput.value)
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    handleSearch()
  })

  searchInput.addEventListener('input', handleSearch)

  section.append(title, form)

  return {
    element: section,
    setSearchValue: (value: string) => {
      searchInput.value = value
    },
  }
}
