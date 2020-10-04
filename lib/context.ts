import { inject, reactive } from 'vue'
import { CommonFieldType, Theme } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context:
    | { theme: Theme; SchemaItem: CommonFieldType }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
