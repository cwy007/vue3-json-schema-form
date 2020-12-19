import { defineComponent } from 'vue'

import { FieldPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'

/**
 * {
 *   items: { type: string }
 * }
 *
 * 固定长度
 * {
 *   items: [
 *     { type: string },
 *     { type: number }
 *   ]
 * }
 *
 * {
 *   items: { type: string, enum: ['1', '2']}
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const VJSFContext = useVJSFContext()

    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const Schemaitem = VJSFContext.SchemaItem
      const isMultiType = Array.isArray(schema.items)

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => {
          return (
            <Schemaitem
              key={index}
              schema={s}
              rootSchema={rootSchema}
              value={arr[index]}
              onChange={(v: any) => handleMultiTypeChange(v, index)}
            />
          )
        })
      }

      return <div>array field</div>
    }
  },
})
