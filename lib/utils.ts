import Ajv from 'ajv'

import { Schema } from './types'

import jsonpointer from 'jsonpointer'
import union from 'lodash.union'
import mergeAllOf from 'json-schema-merge-allof'

export function isObject(thing: any) {
  return typeof thing === 'object' && thing !== null && !Array.isArray(thing)
}

export function isEmptyObject(thing: any) {
  return isObject(thing) && Object.keys(thing).length === 0
}

export function hasOwnProperty(obj: any, key: string) {
  /**
   * 直接调用`obj.hasOwnProperty`有可能会因为
   * obj 覆盖了 prototype 上的 hasOwnProperty 而产生错误
   */
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// import { isObject, hasOwnProperty, getSchemaType, guessType } from './utils'
// import { validateData } from './validator'

// TODO: 应该跟SchemaForm的instance保持一致
const defaultInstance = new Ajv()
export function validateData(schema: any, data: any) {
  const valid = defaultInstance.validate(schema, data)
  return {
    valid,
    errors: defaultInstance.errors,
  }
}

// function resolveSchema(schema: any, data: any = {}) {}

export function resolveSchema(schema: Schema, rootSchema = {}, formData = {}) {
  if (hasOwnProperty(schema, '$ref')) {
    return resolveReference(schema, rootSchema, formData)
  } else if (hasOwnProperty(schema, 'dependencies')) {
    const resolvedSchema = resolveDependencies(schema, rootSchema, formData)
    return retrieveSchema(resolvedSchema, rootSchema, formData)
  } else if (hasOwnProperty(schema, 'allOf') && Array.isArray(schema.allOf)) {
    return {
      ...schema,
      allOf: schema.allOf.map((allOfSubschema) =>
        retrieveSchema(allOfSubschema, rootSchema, formData),
      ),
    }
  } else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema
  }
}

export function retrieveSchema(
  schema: any,
  rootSchema = {},
  formData: any = {},
): Schema {
  if (!isObject(schema)) {
    return {} as Schema
  }
  let resolvedSchema = resolveSchema(schema, rootSchema, formData)

  // TODO: allOf and additionalProperties not implemented
  if ('allOf' in schema) {
    try {
      resolvedSchema = mergeAllOf({
        // TODO: Schema type not suitable
        ...resolvedSchema,
        allOf: resolvedSchema.allOf,
      } as any) as Schema
    } catch (e) {
      console.warn('could not merge subschemas in allOf:\n' + e)
      const { allOf, ...resolvedSchemaWithoutAllOf } = resolvedSchema
      return resolvedSchemaWithoutAllOf
    }
  }
  const hasAdditionalProperties =
    resolvedSchema.hasOwnProperty('additionalProperties') &&
    resolvedSchema.additionalProperties !== false
  if (hasAdditionalProperties) {
    // put formData existing additional properties into schema
    return stubExistingAdditionalProperties(
      resolvedSchema,
      rootSchema,
      formData,
    )
  }
  return resolvedSchema
}

export const ADDITIONAL_PROPERTY_FLAG = '__additional_property'
// This function will create new "properties" items for each key in our formData
export function stubExistingAdditionalProperties(
  schema: Schema,
  rootSchema: Schema = {},
  formData: any = {},
) {
  // Clone the schema so we don't ruin the consumer's original
  schema = {
    ...schema,
    properties: { ...schema.properties },
  }

  Object.keys(formData).forEach((key) => {
    if ((schema as any).properties.hasOwnProperty(key)) {
      // No need to stub, our schema already has the property
      return
    }

    let additionalProperties
    if (schema.additionalProperties.hasOwnProperty('$ref')) {
      additionalProperties = retrieveSchema(
        { $ref: schema.additionalProperties['$ref'] },
        rootSchema,
        formData,
      )
    } else if (schema.additionalProperties.hasOwnProperty('type')) {
      additionalProperties = { ...schema.additionalProperties }
    } else {
      additionalProperties = { type: guessType(formData[key]) }
    }

    // The type of our new key should match the additionalProperties value;
    ;(schema as any).properties[key] = additionalProperties
    // Set our additional property flag so we know it was dynamically added
    ;(schema as any).properties[key][ADDITIONAL_PROPERTY_FLAG] = true
  })

  return schema
}

// export function processSchema(
//   schema: any,
//   rootSchema: any = {},
//   data: any = {}
// ): Schema {
//   if (hasOwnProperty(schema, '$ref')) {
//     return resolveReference(schema, rootSchema, data)
//   }
//   if (hasOwnProperty(schema, 'dependencies')) {
//     const resolvedSchema = resolveSchema(schema)
//   }
// }

function resolveReference(schema: any, rootSchema: any, formData: any): Schema {
  // Retrieve the referenced schema definition.
  const $refSchema = findSchemaDefinition(schema.$ref, rootSchema)
  // Drop the $ref property of the source schema.
  const { $ref, ...localSchema } = schema
  // Update referenced schema definition with local schema properties.
  return retrieveSchema({ ...$refSchema, ...localSchema }, rootSchema, formData)
}

export function findSchemaDefinition($ref: string, rootSchema = {}): Schema {
  const origRef = $ref
  if ($ref.startsWith('#')) {
    // Decode URI fragment representation.
    $ref = decodeURIComponent($ref.substring(1))
  } else {
    throw new Error(`Could not find a definition for ${origRef}.`)
  }
  const current = jsonpointer.get(rootSchema, $ref)
  if (current === undefined) {
    throw new Error(`Could not find a definition for ${origRef}.`)
  }
  if (hasOwnProperty(current, '$ref')) {
    // return { ...current, findSchemaDefinition(current.$ref, rootSchema) }  ?
    return findSchemaDefinition(current.$ref, rootSchema)
  }
  return current
}

function resolveDependencies(
  schema: any,
  rootSchema: any,
  formData: any,
): Schema {
  // Drop the dependencies from the source schema.
  let { dependencies = {}, ...resolvedSchema } = schema // eslint-disable-line
  if ('oneOf' in resolvedSchema) {
    resolvedSchema =
      resolvedSchema.oneOf[
        getMatchingOption(formData, resolvedSchema.oneOf, rootSchema)
      ]
  } else if ('anyOf' in resolvedSchema) {
    resolvedSchema =
      resolvedSchema.anyOf[
        getMatchingOption(formData, resolvedSchema.anyOf, rootSchema)
      ]
  }
  return processDependencies(dependencies, resolvedSchema, rootSchema, formData)
}
function processDependencies(
  dependencies: any,
  resolvedSchema: any,
  rootSchema: any,
  formData: any,
): Schema {
  // Process dependencies updating the local schema properties as appropriate.
  for (const dependencyKey in dependencies) {
    // Skip this dependency if its trigger property is not present.
    if (formData[dependencyKey] === undefined) {
      continue
    }
    // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)
    if (
      resolvedSchema.properties &&
      !(dependencyKey in resolvedSchema.properties)
    ) {
      continue
    }
    const {
      [dependencyKey]: dependencyValue,
      ...remainingDependencies
    } = dependencies
    if (Array.isArray(dependencyValue)) {
      resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue)
    } else if (isObject(dependencyValue)) {
      resolvedSchema = withDependentSchema(
        resolvedSchema,
        rootSchema,
        formData,
        dependencyKey,
        dependencyValue,
      )
    }
    return processDependencies(
      remainingDependencies,
      resolvedSchema,
      rootSchema,
      formData,
    )
  }
  return resolvedSchema
}

function withDependentProperties(schema: any, additionallyRequired: any) {
  if (!additionallyRequired) {
    return schema
  }
  const required = Array.isArray(schema.required)
    ? Array.from(new Set([...schema.required, ...additionallyRequired]))
    : additionallyRequired
  return { ...schema, required: required }
}

function withDependentSchema(
  schema: any,
  rootSchema: any,
  formData: any,
  dependencyKey: any,
  dependencyValue: any,
) {
  // retrieveSchema
  const { oneOf, ...dependentSchema } = retrieveSchema(
    dependencyValue,
    rootSchema,
    formData,
  )
  schema = mergeSchemas(schema, dependentSchema)
  // Since it does not contain oneOf, we return the original schema.
  if (oneOf === undefined) {
    return schema
  } else if (!Array.isArray(oneOf)) {
    throw new Error(`invalid: it is some ${typeof oneOf} instead of an array`)
  }
  // Resolve $refs inside oneOf.
  const resolvedOneOf = oneOf.map((subschema) =>
    hasOwnProperty(subschema, '$ref')
      ? resolveReference(subschema, rootSchema, formData)
      : subschema,
  )
  return withExactlyOneSubschema(
    schema,
    rootSchema,
    formData,
    dependencyKey,
    resolvedOneOf,
  )
}

function withExactlyOneSubschema(
  schema: any,
  rootSchema: any,
  formData: any,
  dependencyKey: any,
  oneOf: any,
) {
  const validSubschemas = oneOf.filter((subschema: any) => {
    if (!subschema.properties) {
      return false
    }
    const { [dependencyKey]: conditionPropertySchema } = subschema.properties
    if (conditionPropertySchema) {
      const conditionSchema = {
        type: 'object',
        properties: {
          [dependencyKey]: conditionPropertySchema,
        },
      }
      // TODO: validate formdata
      const { errors } = validateData(conditionSchema, formData)
      return !errors || errors.length === 0
    }
  })
  if (validSubschemas.length !== 1) {
    console.warn(
      "ignoring oneOf in dependencies because there isn't exactly one subschema that is valid",
    )
    return schema
  }
  // debugger
  const subschema = validSubschemas[0]
  const {
    [dependencyKey]: conditionPropertySchema,
    ...dependentSubschema
  } = subschema.properties
  const dependentSchema = { ...subschema, properties: dependentSubschema }
  return mergeSchemas(
    schema,
    // retrieveSchema
    retrieveSchema(dependentSchema, rootSchema, formData),
  )
}

// Recursively merge deeply nested schemas.
// The difference between mergeSchemas and mergeObjects
// is that mergeSchemas only concats arrays for
// values under the "required" keyword, and when it does,
// it doesn't include duplicate values.
export function mergeSchemas(obj1: any, obj2: any) {
  const acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]
    if (obj1 && hasOwnProperty(obj1, key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right)
    } else if (
      obj1 &&
      obj2 &&
      (getSchemaType(obj1) === 'object' || getSchemaType(obj2) === 'object') &&
      key === 'required' &&
      Array.isArray(left) &&
      Array.isArray(right)
    ) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = union(left, right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}

// export function getVJSFConfig(
//   schema: Schema,
//   uiSchema: VueJsonSchemaConfig | undefined,
// ): VueJsonSchemaConfig {
//   if (uiSchema) return uiSchema
//   return schema.vjsf || {}
// }

/* Gets the type of a given schema. */
export function getSchemaType(schema: Schema): string | undefined {
  const { type } = schema

  if (!type && schema.const) {
    return guessType(schema.const)
  }

  if (!type && schema.enum) {
    return 'string'
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return 'object'
  }

  const t: any = type
  if (t instanceof Array && t.length === 2 && t.includes('null')) {
    return t.find((type) => type !== 'null')
  }

  return type

  // let { type } = schema

  // if (type) return type

  // if (!type && schema.const) {
  //   return guessType(schema.const)
  // }

  // if (!type && schema.enum) {
  //   // return 'string'
  //   return guessType(schema.enum[0])
  // }

  // if (!type && (schema.properties || schema.additionalProperties)) {
  //   return 'object'
  // }

  // console.warn('can not guess schema type, just use object', schema)
  // return 'object'

  // if (type instanceof Array && type.length === 2 && type.includes('null')) {
  //   return type.find((type) => type !== 'null')
  // }
}

// In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining
export const guessType = function guessType(value: any) {
  if (Array.isArray(value)) {
    return 'array'
  } else if (typeof value === 'string') {
    return 'string'
  } else if (value == null) {
    return 'null'
  } else if (typeof value === 'boolean') {
    return 'boolean'
  } else if (!isNaN(value)) {
    return 'number'
  } else if (typeof value === 'object') {
    return 'object'
  }
  // Default to string if we can't figure it out
  return 'string'
}

export function isConstant(schema: Schema) {
  return (
    (Array.isArray(schema.enum) && schema.enum.length === 1) ||
    schema.hasOwnProperty('const')
  )
}

export function isSelect(_schema: any, rootSchema: Schema = {}) {
  const schema = retrieveSchema(_schema, rootSchema)
  const altSchemas = schema.oneOf || schema.anyOf
  if (Array.isArray(schema.enum)) {
    return true
  } else if (Array.isArray(altSchemas)) {
    return altSchemas.every((altSchemas) => isConstant(altSchemas))
  }
  return false
}

export function isMultiSelect(schema: Schema, rootSchema: Schema = {}) {
  if (!schema.uniqueItems || !schema.items) {
    return false
  }
  return isSelect(schema.items, rootSchema)
}

// TODO: change oneOf selected based on data
export function getMatchingOption(
  formData: any,
  options: Schema[],
  isValid: (schema: Schema, data: any) => boolean,
) {
  for (let i = 0; i < options.length; i++) {
    const option = options[i]

    // If the schema describes an object then we need to add slightly more
    // strict matching to the schema, because unless the schema uses the
    // "requires" keyword, an object will match the schema as long as it
    // doesn't have matching keys with a conflicting type. To do this we use an
    // "anyOf" with an array of requires. This augmentation expresses that the
    // schema should match if any of the keys in the schema are present on the
    // object and pass validation.
    if (option.properties) {
      // Create an "anyOf" schema that requires at least one of the keys in the
      // "properties" object
      const requiresAnyOf = {
        anyOf: Object.keys(option.properties).map((key) => ({
          required: [key],
        })),
      }

      let augmentedSchema

      // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"
      if (option.anyOf) {
        // Create a shallow clone of the option
        const { ...shallowClone } = option

        if (!shallowClone.allOf) {
          shallowClone.allOf = []
        } else {
          // If "allOf" already exists, shallow clone the array
          shallowClone.allOf = shallowClone.allOf.slice()
        }

        shallowClone.allOf.push(requiresAnyOf)

        augmentedSchema = shallowClone
      } else {
        augmentedSchema = Object.assign({}, option, requiresAnyOf)
      }

      // Remove the "required" field as it's likely that not all fields have
      // been filled in yet, which will mean that the schema is not valid
      delete augmentedSchema.required

      if (isValid(augmentedSchema, formData)) {
        return i
      }
    } else if (isValid(options[i], formData)) {
      return i
    }
  }
  return 0
}

export function mergeDefaultsWithFormData(defaults: any, formData: any): any {
  if (Array.isArray(formData)) {
    if (!Array.isArray(defaults)) {
      defaults = []
    }
    return formData.map((value, idx) => {
      if (defaults[idx]) {
        return mergeDefaultsWithFormData(defaults[idx], value)
      }
      return value
    })
  } else if (isObject(formData)) {
    const acc = Object.assign({}, defaults) // Prevent mutation of source object.
    return Object.keys(formData).reduce((acc, key) => {
      acc[key] = mergeDefaultsWithFormData(
        defaults ? defaults[key] : {},
        formData[key],
      )
      return acc
    }, acc)
  } else {
    return formData
  }
}

export function getDefaultFormState(
  _schema: Schema,
  formData: any,
  // rootSchema = {},
  // includeUndefinedValues = false,
) {
  if (!isObject(_schema)) {
    throw new Error('Invalid schema: ' + _schema)
  }
  // const schema = retrieveSchema(_schema, rootSchema, formData)
  const defaults = _schema.default
  // TODO: I guess we don't need to get default from children schema
  // const defaults = computeDefaults(
  //   schema,
  //   _schema.default,
  //   rootSchema,
  //   formData,
  //   includeUndefinedValues
  // );
  if (typeof formData === 'undefined') {
    // No form data? Use schema defaults.
    return defaults
  }
  if (isObject(formData) || Array.isArray(formData)) {
    return mergeDefaultsWithFormData(defaults, formData)
  }
  if (formData === 0 || formData === false || formData === '') {
    return formData
  }
  return formData || defaults
}
