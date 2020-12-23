import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

const NumberWidget = withFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const v = e.target.value
        e.target.value = props.value
        const value = Number(v)
        Number.isNaN(value) ? props.onChange(undefined) : props.onChange(value)
      }

      return () => {
        const { value } = props
        return (
          <input type="number" value={value as any} onInput={handleChange} />
        )
      }
    },
  }),
)

export default NumberWidget
