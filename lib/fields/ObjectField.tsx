import { defineComponent, inject } from 'vue'

import { FieldPropsDefine } from '../types'
import { SchemaFormContextKey } from '../context'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup() {
    const context: any = inject(SchemaFormContextKey)

    return () => {
      const { SchemaItem } = context
      return <div>Object Field</div>
    }
  },
})
