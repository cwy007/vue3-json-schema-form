import { defineComponent } from 'vue'

import { FiledPropsDefine } from '../types'

import { useVJSFContext } from '../context'

/**
 * {
 *   items: { type: string },
 * }
 *
 * {
 *   items: [
 *    { type: string },
 *    { type: number }
 *   ]
 * }
 *
 * {
 *   items: { type: string, enum: ['1', '2'] },
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    return () => {
      const SchemaItem = context.SchemaItem
    }
  },
})
