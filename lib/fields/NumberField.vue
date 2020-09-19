<template>
  <input :value="value" type="number" @input="handleChange" />
</template>

<script lang="ts" setup="props">
import { FiledPropsDefine, Schema } from '../types'

export default {
  props: FiledPropsDefine,
}

declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}

export const handleChange = (e: any) => {
  const value = e.target.value

  const num = Number(value)

  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(num)
  }
}
</script>
