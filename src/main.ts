import './style.css'
import { createMissionSection } from './Mainpage/Mission.ts'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('App container not found')
}

const shell = document.createElement('div')
shell.className = 'app-shell'

const landing = createMissionSection({
  selectedQuery: '',
  onSearch: handleSearch,
})

shell.append(landing.element)
app.replaceChildren(shell)

function handleSearch(nextQuery: string): void {
  const trimmed = nextQuery.trim()

  if (!trimmed) {
    return
  }

  const destination = new URL('https://www.google.com/search')
  destination.searchParams.set('q', trimmed)

  window.location.href = destination.toString()
}
