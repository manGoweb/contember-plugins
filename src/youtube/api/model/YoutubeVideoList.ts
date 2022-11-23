import { SchemaDefinition as d } from '@contember/schema-definition'
import { YoutubeVideo } from './YoutubeVideo'

export class YoutubeVideoList {
	items = d.oneHasMany(YoutubeVideoListItem, 'list').orderBy('order')
}

export class YoutubeVideoListItem {
	list = d.manyHasOne(YoutubeVideoList, 'items').notNull().cascadeOnDelete()
	order = d.intColumn().notNull().default(0)
	youtube = d.oneHasOne(YoutubeVideo).setNullOnDelete()
}
