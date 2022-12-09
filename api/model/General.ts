import { SchemaDefinition as d } from '@contember/schema-definition'
import { Image, ImageList } from './Image'
import { One } from './One'
import { YoutubeVideo, YoutubeVideoList } from './Youtube'

export class General {
	unique = d.enumColumn(One).notNull().unique()

	text = d.stringColumn().notNull()

	singleImage = d.oneHasOne(Image).setNullOnDelete()
	imageList = d.oneHasOne(ImageList).setNullOnDelete()

	singleYoutubeVideo = d.oneHasOne(YoutubeVideo).setNullOnDelete()
	youtubeVideoList = d.oneHasOne(YoutubeVideoList).setNullOnDelete()
}
