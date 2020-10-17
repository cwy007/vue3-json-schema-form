import { defineComponent, computed } from 'vue'
import { CustomFormat, CommonWidgetPropsDefine } from '../../lib/types'

import { withFormItem } from '../../lib/theme-default/FormItem'

const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      props: CommonWidgetPropsDefine,
      setup(props) {
        const handleChange = (e: any) => {
          const value = e.target.value
          e.target.value = props.value
          props.onChange(value)
        }

        const styleRef = computed(() => {
          return {
            color: (props.options && props.options.color) || 'black',
          }
        })

        return () => {
          return (
            <input
              type="color"
              value={props.value as any}
              onInput={handleChange}
              style={styleRef.value}
            />
          )
        }
      },
    }),
  ),
}

export default format
