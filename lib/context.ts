import { inject, Ref } from 'vue'
import { CommonFieldType, CommonWidgetDefine, Schema } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context:
    | {
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
        transformSchemaRef: Ref<(schema: Schema) => Schema>
      }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
