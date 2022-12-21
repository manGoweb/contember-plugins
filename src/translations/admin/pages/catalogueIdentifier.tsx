import { MultiEditPage, TextField } from '@contember/admin'

export const catalogueIdentifierList = (
	<MultiEditPage
		entities="TranslationCataloguesIdentifier"
		orderBy="name asc"
		rendererProps={{
			title: 'Translation catalogue identifiers',
		}}
	>
		<TextField field="code" label="Code" />
		<TextField field="name" label="Name" />
	</MultiEditPage>
)
