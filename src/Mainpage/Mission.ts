import type { NewManagerInput } from '../types.ts'

interface MissionOptions {
  onCreateManager: (input: NewManagerInput) => void
  onSearch: (query: string) => void
  selectedCompany: string
  companies: string[]
}

interface MissionSection {
  element: HTMLElement
  setSearchValue: (value: string) => void
  setCompanies: (companies: string[]) => void
}

export function createMissionSection({
  onCreateManager,
  onSearch,
  selectedCompany,
  companies,
}: MissionOptions): MissionSection {
  const section = document.createElement('section')
  section.className = 'mission'

  const heading = document.createElement('div')
  heading.className = 'mission__content'
  heading.innerHTML = `
    <h1>Mgrly</h1>
    <p class="mission__tagline">
      Blast off with bold manager shout-outs and honest reviews.
    </p>
    <p class="mission__description">
      Spotlight standout leaders, drop real talk on their impact, and discover how teams thrive across every company.
    </p>
  `

  const searchForm = document.createElement('form')
  searchForm.className = 'mission__search'

  const searchLabel = document.createElement('label')
  searchLabel.className = 'form-field'
  searchLabel.innerHTML = `
    <span>Search by company</span>
  `

  const searchInput = document.createElement('input')
  searchInput.type = 'search'
  searchInput.name = 'company'
  searchInput.placeholder = 'Start typing a company...'
  searchInput.autocomplete = 'off'
  searchInput.value = selectedCompany

  const datalist = document.createElement('datalist')
  const listId = `companies-${Math.random().toString(36).slice(2, 8)}`
  datalist.id = listId
  searchInput.setAttribute('list', listId)

  const actions = document.createElement('div')
  actions.className = 'mission__actions'

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Submit'

  const addButton = document.createElement('button')
  addButton.type = 'button'
  addButton.className = 'secondary'
  addButton.textContent = 'Add new manager'

  searchLabel.append(searchInput, datalist)
  actions.append(submitButton, addButton)
  searchForm.append(searchLabel, actions)

  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')
  modal.setAttribute('aria-label', 'Add a new manager')

  const modalContent = document.createElement('div')
  modalContent.className = 'modal__content'

  const closeButton = document.createElement('button')
  closeButton.type = 'button'
  closeButton.className = 'modal__close secondary'
  closeButton.textContent = 'Close'

  const form = document.createElement('form')
  form.className = 'manager-form'
  form.innerHTML = `
    <h2 class="manager-form__heading">Post a manager</h2>
    <label class="form-field">
      <span>Manager name</span>
      <input type="text" name="name" placeholder="Jordan Lee" required />
    </label>
    <label class="form-field">
      <span>Company</span>
      <input type="text" name="company" placeholder="Acme Robotics" required />
    </label>
    <label class="form-field">
      <span>Role</span>
      <input type="text" name="role" placeholder="Product Manager Lead" required />
    </label>
    <button type="submit">Add manager</button>
  `

  modalContent.append(closeButton, form)
  modal.append(modalContent)

  function openModal(): void {
    modal.classList.add('is-open')
    document.body.classList.add('modal-open')
  }

  function closeModal(): void {
    modal.classList.remove('is-open')
    document.body.classList.remove('modal-open')
  }

  function handleSearch(event?: Event): void {
    event?.preventDefault()
    onSearch(searchInput.value.trim())
  }

  searchForm.addEventListener('submit', handleSearch)
  addButton.addEventListener('click', () => {
    openModal()
    const nameField = form.querySelector<HTMLInputElement>('input[name="name"]')
    nameField?.focus()
  })

  closeButton.addEventListener('click', () => {
    closeModal()
  })

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const name = (formData.get('name') ?? '').toString().trim()
    const company = (formData.get('company') ?? '').toString().trim()
    const role = (formData.get('role') ?? '').toString().trim()

    if (!name || !company || !role) {
      return
    }

    onCreateManager({ name, company, role })
    form.reset()
    closeModal()
  })

  section.append(heading, searchForm)
  document.body.append(modal)

  const setCompanies = (nextCompanies: string[]) => {
    datalist.replaceChildren(
      ...nextCompanies
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .map((company) => {
          const option = document.createElement('option')
          option.value = company
          return option
        }),
    )
  }

  setCompanies(companies)

  return {
    element: section,
    setSearchValue: (value: string) => {
      searchInput.value = value
    },
    setCompanies,
  }
}
