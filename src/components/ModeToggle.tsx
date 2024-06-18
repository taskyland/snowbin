import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './kobalte/DropdownMenu'
import type { DropdownMenuTriggerProps } from '@kobalte/core/dropdown-menu'
import { Button } from './kobalte/Button'
import { type Component, createEffect } from 'solid-js'
import { useColorMode } from 'solidjs-use'

export const ModeToggle: Component = () => {
  const { mode, setMode } = useColorMode({
    emitAuto: true
  })

  createEffect(() => {
    document.documentElement.className = mode()
    document.body.className = mode() === 'auto' ? 'light' : mode()
  })

  return (
    <DropdownMenu placement='bottom-end'>
      <DropdownMenuTrigger
        as={(props: DropdownMenuTriggerProps) => (
          <Button variant='ghost' size='icon' class='w-9 px-0' {...props}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              class='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
            >
              <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
              viewBox='0 0 24 24'
            >
              <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z'
              />
            </svg>
            <span class='sr-only'>Toggle theme</span>
          </Button>
        )}
      />
      <DropdownMenuContent class='min-w-[8rem]'>
        <DropdownMenuItem onSelect={() => setMode('light')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='mr-2 h-4 w-4'
            viewBox='0 0 24 24'
          >
            <path
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7'
            />
          </svg>
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setMode('dark')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='mr-2 h-4 w-4'
            viewBox='0 0 24 24'
          >
            <path
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z'
            />
          </svg>
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setMode('auto')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='mr-2 h-4 w-4'
            viewBox='0 0 24 24'
          >
            <path
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M3 19h18M5 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z'
            />
          </svg>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
