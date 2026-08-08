;(() => {
  const textarea = document.querySelector('#input')
  const key = document.querySelector('#key')
  const url = document.querySelector('#url')
  const editId = document.querySelector('#id')
  const getButton = document.querySelector('#get')
  const saveButton = document.querySelector('#save')
  const deleteButton = document.querySelector('#delete')
  const editStatus = document.querySelector('#edit-status')
  const deleteStatus = document.querySelector('#delete-status')
  let loadedId = ''

  const getPasteId = (value) => {
    const trimmed = value.trim()
    if (!trimmed) return ''

    try {
      const url = new URL(trimmed, window.location.origin)
      const parts = url.pathname.split('/').filter(Boolean)
      if (parts.at(-1) === 'raw') parts.pop()
      return parts.length === 1 ? decodeURIComponent(parts[0]) : ''
    } catch {
      return ''
    }
  }

  const setBusy = (button, busy) => {
    if (busy) {
      button.setAttribute('disabled', true)
      button.ariaBusy = true
    } else {
      button.removeAttribute('disabled')
      button.ariaBusy = false
    }
  }

  const loadPaste = async () => {
    const id = getPasteId(editId.value)
    if (!id) {
      editStatus.textContent = 'Enter a paste ID or URL.'
      return false
    }

    setBusy(getButton, true)
    editStatus.textContent = 'Loading…'
    document.body.style.cursor = 'wait'

    try {
      const response = await fetch(`/${encodeURIComponent(id)}/raw`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        editStatus.textContent = await response.text()
        return false
      }

      textarea.value = await response.text()
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
      editId.value = id
      url.value = id
      loadedId = id
      editStatus.textContent = `Loaded /${id}. Make your changes above.`
      return true
    } catch (error) {
      editStatus.textContent = 'Error! Please check your console for errors.'
      console.error(error)
      return false
    } finally {
      setBusy(getButton, false)
      document.body.style.cursor = 'default'
    }
  }

  getButton.addEventListener('click', async (event) => {
    event.preventDefault()
    await loadPaste()
  })

  editId.addEventListener('input', () => {
    if (getPasteId(editId.value) !== loadedId) loadedId = ''
  })

  editId.addEventListener('change', () => {
    void loadPaste()
  })

  editId.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      void loadPaste()
    }
  })

  saveButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const id = getPasteId(editId.value)
    if (!id || id !== loadedId) {
      editStatus.textContent = 'Load a paste before saving changes.'
      return
    }

    if (!key.value) {
      editStatus.textContent = 'Enter the admin key.'
      return
    }

    setBusy(saveButton, true)
    editStatus.textContent = 'Saving…'
    document.body.style.cursor = 'wait'

    try {
      const response = await fetch(`/api/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: textarea.value, key: key.value })
      })

      if (!response.ok) {
        editStatus.textContent = await response.text()
        return
      }

      editStatus.textContent = `Saved /${id}.`
    } catch (error) {
      editStatus.textContent = 'Error! Please check your console for errors.'
      console.error(error)
    } finally {
      setBusy(saveButton, false)
      document.body.style.cursor = 'default'
    }
  })

  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const id = getPasteId(editId.value)
    if (!id) {
      deleteStatus.textContent = 'Enter a paste ID or URL.'
      return
    }

    if (!key.value) {
      deleteStatus.textContent = 'Enter the admin key.'
      return
    }

    if (!window.confirm(`Delete /${id}? This cannot be undone.`)) return

    setBusy(deleteButton, true)
    deleteStatus.textContent = 'Deleting…'
    document.body.style.cursor = 'wait'

    try {
      const response = await fetch(`/api/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: key.value })
      })

      if (!response.ok) {
        deleteStatus.textContent = await response.text()
        return
      }

      deleteStatus.textContent = `Deleted /${id}.`
      loadedId = ''
      editId.value = ''
      url.value = ''
      textarea.value = ''
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    } catch (error) {
      deleteStatus.textContent = 'Error! Please check your console for errors.'
      console.error(error)
    } finally {
      setBusy(deleteButton, false)
      document.body.style.cursor = 'default'
    }
  })
})()
