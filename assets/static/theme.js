;(() => {
  let v = localStorage.getItem('color-scheme'),
    a = window.matchMedia('(prefers-color-scheme: dark)').matches,
    cl = document.documentElement.classList,
    setColorScheme = (v) =>
      (!v || v === 'auto' ? a : v === 'dark')
        ? cl.add('dark')
        : cl.remove('dark')
  setColorScheme(v)
  window.setColorScheme = (v) => {
    setColorScheme(v)
    localStorage.setItem('color-scheme', v)
  }
})()
