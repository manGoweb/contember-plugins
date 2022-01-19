import { Model } from '@contember/schema'
import { SchemaDefinition as d } from '@contember/schema-definition'
import { Interface } from '@contember/schema-definition/dist/src/model/definition/types'

export class Image {
	url: Interface<d.ColumnDefinition<Model.ColumnType>> = d
		.stringColumn()
		.notNull()
	width: Interface<d.ColumnDefinition<Model.ColumnType>> = d.intColumn()
	height: Interface<d.ColumnDefinition<Model.ColumnType>> = d.intColumn()
	size: Interface<d.ColumnDefinition<Model.ColumnType>> = d.intColumn()
	type: Interface<d.ColumnDefinition<Model.ColumnType>> = d.stringColumn()

	alt: Interface<d.ColumnDefinition<Model.ColumnType>> = d.stringColumn()
}
