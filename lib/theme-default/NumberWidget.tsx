import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

import { withFormItem } from './FormItem'

const NumberWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      return () => {
        return (
          <input
            type="number"
            value={props.value as any}
            onInput={handleChange}
          />
        )
      }
    },
  }),
)

export default NumberWidget
