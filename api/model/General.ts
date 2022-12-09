import { SchemaDefinition as d } from '@contember/schema-definition'
import { One } from './One'
import { YoutubeVideo, YoutubeVideoList } from './Youtube'

export class General {
	unique = d.enumColumn(One).notNull().unique()

	text = d.stringColumn().notNull()
	singleYoutubeVideo = d.oneHasOne(YoutubeVideo).setNullOnDelete()
	youtubeVideoList = d.oneHasOne(YoutubeVideoList).setNullOnDelete()
}
