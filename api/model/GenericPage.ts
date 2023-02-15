import { SchemaDefinition as d } from '@contember/schema-definition'
import { Linkable } from './Linkable'
import { Seo } from './Seo'

export class GenericPage {
	link = d.oneHasOneInverse(Linkable, 'genericPage').notNull()
	title = d.stringColumn()
	seo = d.oneHasOne(Seo).setNullOnDelete()
}
