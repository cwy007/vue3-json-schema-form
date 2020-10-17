import {
  defineComponent,
  PropType,
  provide,
  Ref,
  watchEffect,
  watch,
  shallowRef,
  ref,
} from 'vue'

import Ajv, { Options } from 'ajv'

import { Schema, SchemaTypes, Theme } from './types'

import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import { validateFormData, ErrorSchema } from './validator'

type A = typeof SchemaItem

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
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
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
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

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )

    async function doValidate() {
      console.log('start validate -------->')
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )

      if (index !== validateIndex.value) return
      console.log('end validate -------->')

      errorSchemaRef.value = result.errorSchema

      validateResolveRef.value(result)
      validateResolveRef.value = undefined

      // return result
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
              // const result = await validateFormData(
              //   validatorRef.value,
              //   props.value,
              //   props.schema,
              //   props.locale,
              //   props.customValidate,
              // )

              // errorSchemaRef.value = result.errorSchema

              // return result
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
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  },
})
