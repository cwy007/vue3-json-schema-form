import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../../lib/types'
import { defineComponent } from 'vue'

import { withFormItem } from '../../lib/theme-default/FormItem'

const PasswordWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
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
            type="password"
            value={props.value as any}
            onInput={handleChange}
          />
        )
      }
    },
  }),
)

export default PasswordWidget
