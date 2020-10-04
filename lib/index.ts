import { defineComponent, h } from 'vue'

import SchemaFrom from './SchemaForm'
import NumberFiled from './fields/NumberField'
import StringField from './fields/StringField'
import ArrayField from './fields/ArrayField'

import SelectionWidget from './widgets/Selection'

export default SchemaFrom

export { NumberFiled, StringField, ArrayField, SelectionWidget }
