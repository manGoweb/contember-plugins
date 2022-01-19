import { SchemaDefinition as d } from '@contember/schema-definition'
import { Image } from '../../../image/api/model'

export class Seo {
	title = d.stringColumn()
	description = d.stringColumn()
	ogTitle = d.stringColumn()
	ogDescription = d.stringColumn()
	ogImage = d.oneHasOne(Image).cascadeOnDelete()
}
