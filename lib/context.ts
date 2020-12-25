import { inject, Ref } from 'vue'
import { CommonFieldType, CommonWidgetDefine } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context:
    | {
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
      }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
