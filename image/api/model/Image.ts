import { SchemaDefinition as d } from '@contember/schema-definition'

export class Image {
	url = d.stringColumn().notNull()
	width = d.intColumn()
	height = d.intColumn()
	size = d.intColumn()
	type = d.stringColumn()

	alt = d.stringColumn()
}
