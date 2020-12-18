import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }

    return () => {
      const { value } = props
      return (
        <input type="text" value={value as string} onInput={handleChange} />
      )
    }
  },
})
