import { SchemaDefinition as d } from '@contember/schema-definition'
import { Image } from './Image'

export class ImageList {
	items = d.oneHasMany(ImageListItem, 'list')
}

export class ImageListItem {
	list = d.manyHasOne(ImageList, 'items').notNull().cascadeOnDelete()
	order = d.intColumn().notNull().default(0)
	image = d.oneHasOne(Image).setNullOnDelete()
}
