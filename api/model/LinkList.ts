import { SchemaDefinition as d } from '@contember/schema-definition'
import { Link } from './Link'

export class LinkList {
	items = d.oneHasMany(LinkListItem, 'list').orderBy('order')
}

export class LinkListItem {
	list = d.manyHasOne(LinkList, 'items').cascadeOnDelete().notNull()

	order = d.intColumn().notNull().default(0)
	link = d.oneHasOne(Link).setNullOnDelete()
}
