import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'

export const Admin: FC = () => {
  return (
    <Layout>
      <script defer={true} src="/static/create.js" />
      <script defer={true} src="/static/admin.js" />
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class="w-full max-w-2xl space-y-4 p-4">
        <Textarea />
        <div class="grid grid-cols-2 gap-4">
          <Input name="Admin Key" id="key" />
          <Input name="Custom URL" id="url" />
        </div>
        <Button id="submit" name="Submit" />
        <hr />
        <h3>Edit a paste</h3>
        <div class="grid grid-cols-2 gap-4">
          <Input name="ID (/xyz)" id="id" />
          <Button name="Fetch" id="get" />
        </div>
        <Button name="Save changes" id="save" />
        <p id="edit-status" class="text-sm" aria-live="polite" />
        <h3>Delete a paste</h3>
        <Button name="Delete" id="delete" />
        <p id="delete-status" class="text-sm" aria-live="polite" />
      </div>
    </Layout>
  )
}
