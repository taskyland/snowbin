const textarea = document.getElementById('input')
const size = document.getElementById('size')
const btn = document.getElementById('submit')
const key = document.getElementById('key')
const url = document.getElementById('url')

textarea.addEventListener('input', (e) => {
  /* count text bytes */
  const byteSize = new Blob([e.currentTarget.value]).size
  const kbSize = (byteSize / 1024).toFixed(2)
  size.innerText = `${kbSize} KB / 1024 KB`
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
      key: key.value
    }),
    ...(url !== null && {
      url: url.value
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
    window.location.href = `/${data.id}`
  } catch (err) {
    alert('Error! Please check your console for errors.')
    console.error(err)
  } finally {
    btn.removeAttribute('disabled')
    btn.ariaBusy = false
    document.body.style.cursor = 'default'
  }
})
