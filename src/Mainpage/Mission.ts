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
  title.textContent = 'suh dude, welcome to mgrly 💖'

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

  const goButton = document.createElement('button')
  goButton.type = 'submit'
  goButton.className = 'landing__go'
  goButton.textContent = 'Go'

  form.append(searchInput, goButton)

  const handleSearch = () => {
    onSearch(searchInput.value)
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    handleSearch()
  })

  section.append(title, form)

  return {
    element: section,
    setSearchValue: (value: string) => {
      searchInput.value = value
    },
  }
}
