import { defineComponent } from 'vue'

import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup() {
    return () => {
      return <div>Object Field</div>
    }
  },
})
