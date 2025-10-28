interface ReviewBoxOptions {
  onSubmit: (rating: number, summary: string) => void
}

export function createReviewBox({ onSubmit }: ReviewBoxOptions): HTMLElement {
  const form = document.createElement('form')
  form.className = 'review-form'
  form.innerHTML = `
    <h3 class="review-form__heading">Share your experience</h3>
    <label class="form-field">
      <span>Rating</span>
      <select name="rating" required>
        <option value="">Select</option>
        <option value="5">5 - Exceptional</option>
        <option value="4">4 - Great</option>
        <option value="3">3 - Solid</option>
        <option value="2">2 - Needs growth</option>
        <option value="1">1 - Challenging</option>
      </select>
    </label>
    <label class="form-field">
      <span>Highlight</span>
      <textarea name="summary" rows="3" placeholder="What stood out about their leadership?" required></textarea>
    </label>
    <button type="submit">Post review</button>
  `

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const ratingRaw = formData.get('rating')?.toString() ?? ''
    const summary = (formData.get('summary') ?? '').toString().trim()
    const rating = Number.parseInt(ratingRaw, 10)

    if (!rating || Number.isNaN(rating) || rating < 1 || rating > 5 || !summary) {
      return
    }

    onSubmit(rating, summary)
    form.reset()
  })

  return form
}
