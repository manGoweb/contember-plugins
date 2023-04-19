import { SchemaDefinition as d } from '@contember/schema-definition'
import { Linkable } from './Linkable'

export const LinkType = d.createEnum('internal', 'external')

export class Link {
	type = d.enumColumn(LinkType).notNull()
	title = d.stringColumn()
	isTargetBlank = d.boolColumn().notNull().default(false)
	externalLink = d.stringColumn()
	internalLink = d.manyHasOne(Linkable).setNullOnDelete()
}
