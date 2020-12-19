import { computed, defineComponent } from 'vue'

import { FieldPropsDefine, SchemaTypes } from './types'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
import ObjectField from './fields/ObjectField'
import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem', // 中转组件
  props: FieldPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {
      const { schema } = props
      const retrievedSchema = retrievedSchemaRef.value

      // TODO: 如果type没有指定，我们需要猜测这个type

      const type = schema.type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        case SchemaTypes.OBJECT:
          Component = ObjectField
          break
        default:
          console.warn(`${type} is not supported`)
      }
      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
