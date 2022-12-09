import { EditPage, TextField } from '@contember/admin'
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
		<YoutubeVideoField field="singleYoutubeVideo" allowDisconnect label="Single YouTube video" />
		<YoutubeVideoListField field="youtubeVideoList" label="YouTube video list" />
	</EditPage>
)
