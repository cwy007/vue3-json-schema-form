import Ajv, { ErrorNoParams, ErrorObject, ErrorsTextOptions } from 'ajv'
import toPath from 'lodash.topath'
// 没有 ts type文件时，使用require加载
const i18n = require('ajv-i18n')

import { Schema } from './types'

interface TransformedErrorObject {
  name: string
  property: string
  message: string | undefined
  params: any
  schemaPath: string
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}
export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}

// export type ErrorSchema = {
//   [level: string]: ErrorSchema
// } & {
//   __errors: string[]
// }

// interface ErrorSchemaObject {
//   [level: string]: ErrorSchemaObject[]
// }

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    //  n_ > _.toPath('/name/firstName') // => [ '/name/firstName' ]
    // _.toPath('a.b.c'); // => ['a', 'b', 'c']
    // _.toPath('a[0].b.c'); // => ['a', '0', 'b', 'c']
    // const path = toPath(property) //x /obj/a -> [obj, a]
    const path = property.split('/') //√ /obj/a -> [obj, a]
    let parent = errorSchema

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    // {
    //   obj: {
    //     a: {}
    //   }
    // }
    // /obj/a
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    // {
    //   obj: {
    //     a: {__errors: [message]}
    //   }
    // }
    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }

    return errorSchema
  }, {} as ErrorSchema)
}

function transformErrors(
  errors: ErrorObject[] | null | undefined,
): TransformedErrorObject[] {
  if (errors === null || errors === undefined) return []

  //   {
  //     keyword: 'errorMessage',
  //     dataPath: '/name',
  //     schemaPath: '#/properties/name/errorMessage',
  //     params: { errors: [Array] },
  //     message: '自定义关键字验证 test 失败了'
  //   },
  return errors.map(({ keyword, dataPath, schemaPath, params, message }) => {
    return {
      name: keyword,
      property: `${dataPath}`,
      schemaPath,
      params,
      message,
    }
  })
}

export function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale = 'zh',
) {
  let validationError = null
  try {
    validator.validate(schema, formData)
  } catch (err) {
    validationError = err
  }

  i18n[locale](validator.errors)
  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message,
      } as TransformedErrorObject,
    ]
  }

  const errorSchema = toErrorSchema(errors)

  return {
    errors,
    errorSchema,
    valid: errors.length === 0,
  }
}
