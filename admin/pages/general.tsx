import { EditPage, TextField } from '@contember/admin'

export default () => (
	<EditPage
		entity="General(unique = One)"
		setOnCreate="(unique = One)"
		rendererProps={{
			title: 'General',
		}}
	>
		<TextField field="text" label="Text" />
	</EditPage>
)
