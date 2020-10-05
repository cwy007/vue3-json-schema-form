import { defineComponent } from 'vue'

import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringFeild',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      // console.log(e)
      // props.onChange(v + '1')
    }

    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)

    return () => {
      const { schema, rootSchema, ...rest } = props

      const TextWidget = TextWidgetRef.value

      return <TextWidget {...rest} onChange={handleChange} />

      // return (
      //   <input type="text" value={props.value as any} onInput={handleChange} />
      // )
    }
  },
})
