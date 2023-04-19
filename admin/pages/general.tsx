import { EditPage, TextField } from '@contember/admin'
import { LinkField } from '../../src'
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
		<LinkField field="homePage" label="Link to home" allowDisconnect />
		<LinkField field="privacyPolicyPage" label="Link to another" allowTargetBlank allowDisconnect />

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
