import { createRoute } from 'honox/factory'
import { Textarea } from '../components/Textarea'
import { Button } from '../components/Button'
import { render } from '../core/render'

export default createRoute((c) => {
  return render(
    c,
    <>
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class='w-full max-w-2xl space-y-4 p-4'>
        <Textarea />
      </div>
      <div class='w-full max-w-2xl space-y-4 p-4'>
        <Button name='Submit' id='submit' />
      </div>
    </>
  )
})
