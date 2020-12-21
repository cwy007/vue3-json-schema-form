import { inject } from 'vue'
import { CommonfieldType } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context: { SchemaItem: CommonfieldType } | undefined = inject(
    SchemaFormContextKey,
  )

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
