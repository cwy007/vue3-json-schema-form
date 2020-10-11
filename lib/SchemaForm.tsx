import {
  defineComponent,
  PropType,
  provide,
  Ref,
  watchEffect,
  watch,
  shallowRef,
} from 'vue'

import Ajv, { Options } from 'ajv'

import { Schema, SchemaTypes, Theme } from './types'

import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import { validateFormData } from './validator'

type A = typeof SchemaItem

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
}

const defaultAjvOptions: Options = {
  allErrors: true,
  jsonPointers: true,
}

export default defineComponent({
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
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true,
    // },
  },
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context: any = {
      SchemaItem,
      // theme: props.theme,
    }

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any

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
              console.log('--------->')

              // const valid = validatorRef.value.validate(
              //   props.schema,
              //   props.value,
              // ) as boolean

              const result = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
              )

              return result
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  },
})
