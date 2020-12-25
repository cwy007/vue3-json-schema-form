import { getWidget } from '../theme'
import { defineComponent, computed } from 'vue'
import { FieldPropsDefine, CommonWidgetDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const TextWidgetRef = computed(() => {
      return getWidget('TextWidget', props).value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      const TextWidget = TextWidgetRef.value as CommonWidgetDefine
      const { value, schema, errorSchema } = props

      return (
        <TextWidget
          value={value}
          onChange={handleChange}
          schema={schema}
          errors={errorSchema.__errors}
          options={widgetOptionsRef.value}
        />
      )
    }
  },
})
