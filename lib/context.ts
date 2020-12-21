import { inject } from 'vue'
import { CommonfieldType, Theme } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context:
    | { SchemaItem: CommonfieldType; theme: Theme }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
