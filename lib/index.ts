import { defineComponent, h } from 'vue'

import SchemaFrom from './SchemaForm'
import NumberFiled from './fields/NumberField'
import StringField from './fields/StringField'
import ArrayField from './fields/ArrayField'

import SelectionWidget from './widgets/Selection'

import ThemeProvider from './theme'

export default SchemaFrom

export * from './types'

export { NumberFiled, StringField, ArrayField, SelectionWidget, ThemeProvider }
