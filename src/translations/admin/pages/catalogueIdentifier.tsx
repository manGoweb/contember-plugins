import { MultiEditPage, TextField } from '@contember/admin'

export const TranslationCatalogueIdentifierListPage = (
	<MultiEditPage
		pageName="translationCataloguesIdentifierList"
		entities="TranslationCataloguesIdentifier"
		orderBy="name asc"
		rendererProps={{
			title: 'Translation catalogue identifiers',
		}}
	>
		<TextField field="name" label="Name" />
		<TextField field="code" label="Code" />
	</MultiEditPage>
)
