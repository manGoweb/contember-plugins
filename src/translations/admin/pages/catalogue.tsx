import {
	Box,
	Component,
	CreatePage,
	EditPage,
	Field,
	LinkButton,
	NavigateBackButton,
	SelectField,
	TableCell,
	TablePage,
	TextField,
} from '@contember/admin'
import { EditButton } from '../../..'

const TranslationCatalogueForm = Component(
	() => (
		<Box>
			<SelectField field="domain" label="Domain" options="TranslationDomain.name" />
			<TextField field="identifier" label="Identifier" allowNewlines={false} />
			<TextField field="name" label="Name" allowNewlines={false} />
			<SelectField
				field="fallback"
				label="Fallback catalogue"
				options={{ entityName: 'TranslationCatalogue' }}
				renderOption={accessor => {
					const name = accessor.getField<string>('name').value
					const domainName = accessor.getField<string>('domain.name').value
					return (
						<>
							{domainName}: {name}
						</>
					)
				}}
				optionsStaticRender={
					<>
						<Field field="name" />
						<Field field="domain.name" />
					</>
				}
			/>
		</Box>
	),
	'TranslationCatalogueForm',
)

export const TranslationCatalogueListPage = (
	<TablePage
		pageName="translationCatalogueList"
		entities="TranslationCatalogue"
		orderBy="domain.name asc, name asc"
		rendererProps={{
			title: 'Translation Catalogues',
			actions: <LinkButton to="translationCatalogueCreate">Add a new translation catalogue</LinkButton>,
		}}
	>
		<TableCell>
			<Field field="domain.name" />
		</TableCell>

		<TableCell>
			<Field field="name" />
		</TableCell>

		<TableCell shrunk>
			<EditButton pageName="translationCatalogueEdit" />
		</TableCell>
	</TablePage>
)

export const TranslationCatalogueCreatePage = (
	<CreatePage
		pageName="translationCatalogueCreate"
		entity="TranslationCatalogue"
		rendererProps={{
			title: 'Add a new translation catalogue',
			navigation: <NavigateBackButton to="translationCatalogueList">Translation catalogues</NavigateBackButton>,
		}}
		redirectOnSuccess={request => ({ ...request, pageName: 'translationCatalogueList' })}
	>
		<TranslationCatalogueForm />
	</CreatePage>
)

export const TranslationCatalogueEditPage = (
	<EditPage
		pageName="translationCatalogueEdit"
		entity="TranslationCatalogue(id = $id)"
		rendererProps={{
			title: 'Edit translation catalogue',
			navigation: <NavigateBackButton to="translationCatalogueList">TranslationCatalogues</NavigateBackButton>,
		}}
	>
		<TranslationCatalogueForm />
	</EditPage>
)
