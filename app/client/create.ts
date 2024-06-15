const textarea = document.querySelector('#input')!
const size = document.querySelector('#size')!
const btn = document.querySelector('#submit')!
const key = document.querySelector('#key')!
const url = document.querySelector('#url')!

textarea.addEventListener('input', (e) => {
  /* count text bytes */
  const byteSize = new Blob([e.currentTarget.value]).size
  const kbSize = (byteSize / 1024).toFixed(2)
  size.textContent = `${kbSize} KB / 1024 KB`
  if (kbSize > 1024) {
    btn.setAttribute('disabled', true)
  } else {
    btn.removeAttribute('disabled')
  }
})

btn.addEventListener('click', async (e) => {
  e.preventDefault()

  btn.setAttribute('disabled', true)
  btn.ariaBusy = true
  document.body.style.cursor = 'wait'

  const body = {
    content: textarea.value,
    ...(key !== null && {
      editKey: key.value
    }),
    ...(url !== null && {
      slug: url.value
    })
  }
  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (response.status === 400) {
      alert(await response.text())
      return
    }
    const data = await response.json()
    window.location.href = `/${data.slug}`
  } catch (error) {
    alert('Error! Please check your console for errors.')
    console.error(error)
  } finally {
    btn.removeAttribute('disabled')
    btn.ariaBusy = false
    document.body.style.cursor = 'default'
  }
})
