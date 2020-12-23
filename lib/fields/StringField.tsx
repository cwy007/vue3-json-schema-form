import { getWidget } from '../theme'
import { defineComponent } from 'vue'
import { FieldPropsDefine, CommonWidgetDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const TextWidgetRef = getWidget('TextWidget')

    return () => {
      const TextWidget = TextWidgetRef.value as CommonWidgetDefine
      const { value, schema, errorSchema } = props

      return (
        <TextWidget
          value={value}
          onChange={handleChange}
          schema={schema}
          errors={errorSchema.__errors}
        />
      )
    }
  },
})
