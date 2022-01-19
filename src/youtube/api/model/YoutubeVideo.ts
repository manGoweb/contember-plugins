import { SchemaDefinition as d } from '@contember/schema-definition'

export class YoutubeVideo {
	videoId = d.stringColumn().notNull()
}
