import type { Component, JSX } from 'solid-js'

export const Input: Component<{
  id: string
  placeholder: string
  onInput: JSX.CustomEventHandlersCamelCase<HTMLInputElement>['onInput']
}> = (props) => {
  return (
    <input
      class='ring-offset-background file:bg-transparent focus-visible:ring-ring flex h-10 w-full rounded-md bg-neutral-3 text-neutral-dark-5 placeholder:text-neutral-dark-10 dark:bg-neutral-dark-3 dark:text-neutral-5 p-2 text-sm file:border-0 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      placeholder={props.placeholder}
      id={props.id}
      onInput={props.onInput}
    />
  )
}
