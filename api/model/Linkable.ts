import { SchemaDefinition as d } from '@contember/schema-definition'
import { GenericPage } from './GenericPage'

export class Linkable {
	url = d.stringColumn().notNull().unique()

	genericPage = d.oneHasOne(GenericPage, 'link').cascadeOnDelete()
}
