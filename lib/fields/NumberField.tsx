import { FiledPropsDefine } from '../types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberFeild',
  props: FiledPropsDefine,
  setup() {
    return () => <div>Number field</div>
  },
})
