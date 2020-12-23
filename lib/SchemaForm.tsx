import {
  defineComponent,
  PropType,
  provide,
  watch,
  watchEffect,
  shallowRef,
  Ref,
} from 'vue'
import Ajv, { Options } from 'ajv'

import { Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import { validateFormData, ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
}

export default defineComponent({
  name: 'SchemaForm',
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
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const context: any = {
      SchemaItem,
    }
    provide(SchemaFormContextKey, context)
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    const validatorRef: Ref<Ajv> = shallowRef() as any
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              console.log('------------>')
              const result = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
                props.customValidate,
              )

              errorSchemaRef.value = result.errorSchema

              return result
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    return () => {
      const { schema, value } = props

      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  },
})
