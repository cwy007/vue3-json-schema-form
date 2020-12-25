import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { FieldPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'
import { getWidget } from '../theme'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marignRight: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleUp = () => props.onUp(props.index)
    const handleDown = () => props.onDown(props.index)

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

/**
 * 单类型数组 single-type
 * {
 *   items: { type: string }
 * }
 *
 * 固定长度，多类型数组 fixed length & multi-type
 * {
 *   items: [
 *     { type: string },
 *     { type: number }
 *   ]
 * }
 *
 * 多选类型数组 multi-select
 * {
 *   items: { type: string, enum: ['1', '2']}
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }

    const handleUp = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }

    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      if (index === arr.length - 1) return

      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
    }

    const SelectionWidgetRef = getWidget('SelectionWidget')
    return () => {
      const SelectionWidget = SelectionWidgetRef.value
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const { SchemaItem } = context
      const isMultiType = Array.isArray(schema.items)
      // as any 跳过类型检查
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => {
          const itemsUiSchema = uiSchema.items
          const uis = Array.isArray(itemsUiSchema)
            ? itemsUiSchema[index] || {}
            : itemsUiSchema || {}
          return (
            <SchemaItem
              key={index}
              schema={s}
              rootSchema={rootSchema}
              value={arr[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
              errorSchema={errorSchema[index] || {}}
              uiSchema={uis}
            />
          )
        })
      } else if (!isSelect) {
        // single type
        const arr = Array.isArray(value) ? value : []

        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                uiSchema={(uiSchema.items as any) || {}}
                value={v}
                rootSchema={rootSchema}
                onChange={(v: any) => handleArrayItemChange(v, index)}
                key={index}
                errorSchema={errorSchema[index] || {}}
              />
            </ArrayItemWrapper>
          )
        })
      } else {
        // multi-select
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({ key: e, value: e }))
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
            errors={errorSchema.__errors}
            schema={schema}
          />
        )
      }
    }
  },
})
