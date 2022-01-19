import { Model } from '@contember/schema'
import { SchemaDefinition as d } from '@contember/schema-definition'
import { Interface } from '@contember/schema-definition/dist/src/model/definition/types'
import { Image } from '../../../image/api/model'

export class Seo {
	title: Interface<d.ColumnDefinition<Model.ColumnType>> = d.stringColumn()
	description: Interface<d.ColumnDefinition<Model.ColumnType>> =
		d.stringColumn()
	ogTitle: Interface<d.ColumnDefinition<Model.ColumnType>> = d.stringColumn()
	ogDescription: Interface<d.ColumnDefinition<Model.ColumnType>> =
		d.stringColumn()
	ogImage = d.oneHasOne(Image).cascadeOnDelete()
}
