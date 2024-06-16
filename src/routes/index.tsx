import { A } from '@solidjs/router'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { Textarea } from '~/components/Textarea'

export default function Home() {
  return (
    <main>
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class='w-full max-w-2xl space-y-4 p-4'>
        <Textarea />
        <div class='grid grid-cols-3 gap-4'>
          <Input name='Edit Key' id='key' />
          <Input name='Custom URL' id='url' />
          <select
            autocomplete='false'
            id='expiry'
            dir='ltr'
            class='flex h-10 w-full items-center justify-between rounded-md bg-neutral-3 px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-neutral-dark-5 dark:bg-neutral-dark-3 dark:text-neutral-5'
          >
            <span style='pointer-events: none;'>Select option</span>

            <option value='never'>Never</option>
            <option value='10m'>10m</option>
            <option value='hour'>Hour</option>
            <option value='day'>Day</option>
            <option value='week'>Week</option>
            <option value='month'>Month</option>
            <option value='year'>Year</option>
          </select>
        </div>
      </div>
      <div class='w-full max-w-2xl space-y-4 p-4'>
        <Button name='Submit' id='submit' />
      </div>
    </main>
  )
}
