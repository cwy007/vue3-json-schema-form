import { defineComponent, PropType } from 'vue'
import JsonSchemaForm, { Schema, ThemeProvider } from '../../../lib'
import defaultTheme from '../../../lib/theme-default'

// vjsf-theme-default // import {ThemeProvider} from 'vue3-jsonschema-form'
// vue3-jsonschema-form

export const ThemeDefaultProvider = defineComponent({
  setup(p, { slots }) {
    return () => (
      <ThemeProvider theme={defaultTheme}>
        {slots.default && slots.default()}
      </ThemeProvider>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <JsonSchemaForm {...props} />
      </ThemeDefaultProvider>
    )
  },
})
