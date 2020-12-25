import Ajv, { ErrorObject } from 'ajv'
// import toPath from 'lodash.topath'
// 没有 ts type文件时，使用require加载
const i18n = require('ajv-i18n')

import { Schema } from './types'
import { isObject } from './utils'

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
    const { property = '', message } = error
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

export async function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale = 'zh',
  customValidate?: (data: any, errors: any) => void,
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

  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0,
    }
  }

  const proxy = createErrorProxy()
  await customValidate(formData, proxy)
  const newErrorSchema = mergetObjects(errorSchema, proxy, true)
  const newErrors = toErrorList(newErrorSchema)

  return {
    errors: newErrors,
    errorSchema: newErrorSchema,
    valid: newErrors.length === 0,
  }
}

function createErrorProxy() {
  const raw = {}
  return new Proxy(raw, {
    get(target, key, receiver) {
      if (key === 'addError') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', receiver)
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          } else {
            ;(target as any).__errors = [msg]
          }
        }
      }

      const res = Reflect.get(target, key, receiver)
      if (res === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }
      return res
    },
  })
}

export function mergetObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects
  const accumulator = Object.assign({}, obj1) // Prevent mutation of source object
  return Object.keys(obj2).reduce((accumulator, key) => {
    const left = obj1 ? obj1[key] : {}
    const right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      accumulator[key] = mergetObjects(left, right, concatArrays) // 递归
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      accumulator[key] = left.concat(right)
    } else {
      accumulator[key] = right
    }
    return accumulator
  }, accumulator)
}

export function toErrorList(errorSchema: ErrorSchema, fieldName = 'root') {
  // XXX: We should transform fieldName as a full field path string.
  let errorList: TransformedErrorObject[] = []
  if ('__errors' in errorSchema) {
    errorList = errorList.concat(
      (errorSchema.__errors || []).map((stack) => {
        return {
          message: `${fieldName}: ${stack}`,
        } as TransformedErrorObject
      }),
    )
  }
  return Object.keys(errorSchema).reduce((acc, key) => {
    if (key !== '__errors') {
      acc = acc.concat(toErrorList(errorSchema[key], key))
    }
    return acc
  }, errorList)
}
