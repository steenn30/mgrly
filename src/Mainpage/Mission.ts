import type { NewManagerInput } from '../types.ts'

interface MissionOptions {
  onCreateManager: (input: NewManagerInput) => void
}

export function createMissionSection({ onCreateManager }: MissionOptions): HTMLElement {
  const section = document.createElement('section')
  section.className = 'mission'

  const heading = document.createElement('div')
  heading.className = 'mission__content'
  heading.innerHTML = `
    <h1>Mgrly</h1>
    <p class="mission__tagline">
      Rate, review, and celebrate the managers who make work human.
    </p>
    <p class="mission__description">
      Add new leaders to the directory, share candid feedback, and explore how managers show up across companies.
    </p>
  `

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
  })

  section.append(heading, form)
  return section
}
