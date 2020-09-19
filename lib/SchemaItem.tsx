import { defineComponent, PropType } from 'vue'

import { Schema, SchemaTypes, FiledPropsDefine } from './types'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props

      // TODO: 如果type没有指定，我们需要猜测这个type

      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props} />
    }
  },
})
