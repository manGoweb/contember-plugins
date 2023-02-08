import { EditPage, TextField } from '@contember/admin'
import { CollapsibleBox } from '../../src/collapsibleBox/admin'
import { ImageField, ImageListField } from '../../src/image/admin'
import { YoutubeVideoField, YoutubeVideoListField } from '../../src/youtube/admin'

export default () => (
	<EditPage
		entity="General(unique = One)"
		setOnCreate="(unique = One)"
		rendererProps={{
			title: 'General',
		}}
	>
		<TextField field="text" label="Text" />

		<CollapsibleBox heading="Images">
			<ImageField field="singleImage" label="Single image" />
			<ImageListField field="imageList" label="Image list" />
		</CollapsibleBox>

		<ImageField field="singleImage" label="Single image" />
		<ImageListField field="imageList" label="Image list" />

		<YoutubeVideoField field="singleYoutubeVideo" allowDisconnect label="Single YouTube video" />
		<YoutubeVideoListField field="youtubeVideoList" label="YouTube video list" />
	</EditPage>
)
