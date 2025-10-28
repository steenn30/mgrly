interface SearchBarOptions {
  companies: string[]
  selectedCompany: string
  onFilterChange: (company: string) => void
}

export function createSearchBar({ companies, selectedCompany, onFilterChange }: SearchBarOptions): HTMLElement {
  const wrapper = document.createElement('section')
  wrapper.className = 'search'

  const form = document.createElement('form')
  form.className = 'search__form'

  const label = document.createElement('label')
  label.className = 'form-field'
  label.innerHTML = `
    <span>Search by company</span>
  `

  const input = document.createElement('input')
  input.type = 'search'
  input.name = 'company'
  input.placeholder = 'Start typing a company...'
  input.autocomplete = 'off'
  input.value = selectedCompany

  const datalist = document.createElement('datalist')
  const listId = `companies-${Math.random().toString(36).slice(2, 8)}`
  datalist.id = listId
  companies
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .forEach((company) => {
      const option = document.createElement('option')
      option.value = company
      datalist.append(option)
    })

  input.setAttribute('list', listId)

  const actions = document.createElement('div')
  actions.className = 'search__actions'

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Apply filter'

  const clearButton = document.createElement('button')
  clearButton.type = 'button'
  clearButton.className = 'secondary'
  clearButton.textContent = 'Clear'

  label.append(input, datalist)
  form.append(label, actions)
  actions.append(submitButton, clearButton)
  wrapper.append(form)

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    onFilterChange(input.value.trim())
  })

  clearButton.addEventListener('click', () => {
    input.value = ''
    onFilterChange('')
  })

  input.addEventListener('change', () => {
    onFilterChange(input.value.trim())
  })

  return wrapper
}
