import { CommonWidgetPropsDefine, CustomFormat } from '../../lib'
import { withFormItem } from '../../lib/theme-default/FormItem'
import { computed, defineComponent } from 'vue'
import { CommonWidgetDefine } from '../../lib/types'

const component = withFormItem(
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
)

const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Za-z]{6}$/,
  },
  component: component as any,
}

export default format
