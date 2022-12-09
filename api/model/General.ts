import { SchemaDefinition as d } from '@contember/schema-definition'
import { One } from './One'

export class General {
	unique = d.enumColumn(One).notNull().unique()

	text = d.stringColumn().notNull()
}
