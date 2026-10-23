import { act, fireEvent } from '@testing-library/react'
import type { Editor } from '@tiptap/react'
import { promptText, promptTextContent } from './native-chat-prompt-document'

export function promptEditor(element: HTMLElement): Editor {
  return (element as HTMLElement & { editor: Editor }).editor
}

export function promptValue(element: HTMLElement): string {
  return promptText(promptEditor(element).state.doc)
}

export function changePrompt(element: HTMLElement, value: string): void {
  act(() => {
    promptEditor(element).commands.setContent(promptTextContent(value))
  })
}

/** happy-dom's CompositionEvent is a plain Event, so `fireEvent.compositionEnd` drops `data`. */
export function endComposition(element: HTMLElement, data: string): void {
  const event = new Event('compositionend', { bubbles: true })
  Object.defineProperty(event, 'data', { value: data })
  fireEvent(element, event)
}
