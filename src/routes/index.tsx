import { createSignal } from 'solid-js'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { lowerCasify, type Expiration } from '~/core/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/Select'

export default function Home() {
  const [size, setSize] = createSignal(0)
  const [key, setKey] = createSignal('')
  const [url, setUrl] = createSignal('')
  const [expiry, setExpiry] = createSignal<Expiration>('never')
  const [content, setContent] = createSignal('')

  const updateSize = (event: any) => {
    const text = event.target.value
    const textSizeInKB = (new Blob([text]).size / 1024).toFixed(2) // size in KB, with 2 decimal places
    setSize(Number(textSizeInKB))
    setContent(text)
  }

  const handleSubmit = async () => {
    const data = {
      slug: url() || undefined,
      editKey: key() || undefined,
      expiresAt: expiry() || undefined,
      content: content()
    }

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      // TODO: redirect
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main>
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class='w-full max-w-2xl space-y-4 p-4'>
        <div class='relative'>
          <textarea
            class='ring-offset-background focus-visible:ring-ring flex h-96 min-h-[80px] w-full rounded-md bg-neutral-3 p-4 text-sm text-neutral-dark-5 placeholder:text-neutral-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-dark-3 dark:text-neutral-5'
            placeholder='Enter your text here. ✨'
            spellcheck={false}
            id='input'
            onInput={updateSize}
          />
          <div class='absolute bottom-2 left-2 text-xs text-black dark:text-white'>
            <span id='size'>{size()} KB / 1024 KB</span>
          </div>
        </div>

        <div class='grid grid-cols-3 gap-4'>
          <Input
            placeholder='Edit Key'
            id='key'
            onInput={(e) => setKey(e.target.value)}
          />
          <Input
            placeholder='Custom URL'
            id='url'
            onInput={(e) => setUrl(e.target.value)}
          />
          <Select
            placeholder='Expiration'
            options={['Never', '10m', 'Hour', 'Day', 'Week', 'Month', 'Year']}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
            onChange={(v) => setExpiry(lowerCasify(v) as Expiration)}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
      </div>
      <div class='w-full max-w-2xl space-y-4 p-4'>
        <Button name='Submit' id='submit' onClick={() => handleSubmit()} />
      </div>
    </main>
  )
}
