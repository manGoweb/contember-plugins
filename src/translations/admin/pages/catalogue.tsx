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
} from '@contember/admin'

const TranslationCatalogueForm = Component(
	() => (
		<Box>
			<SelectField field="domain" label="Domain" options="TranslationDomain.name" />
			<SelectField field="identifier" label="Identifier" options="TranslationCataloguesIdentifier.name"></SelectField>
			<SelectField
				field="fallback"
				label="Fallback catalogue"
				options={{ entityName: 'TranslationCatalogue' }}
				renderOption={accessor => {
					const name = accessor.getField<string>('identifier.name').value
					const domainName = accessor.getField<string>('domain.name').value
					return (
						<>
							{domainName}: {name}
						</>
					)
				}}
				optionsStaticRender={
					<>
						<Field field="identifier.name" />
						<Field field="domain.name" />
					</>
				}
			/>
		</Box>
	),
	'TranslationCatalogueForm',
)

export const catalogueList = (
	<TablePage
		entities="TranslationCatalogue"
		orderBy="domain.name asc, identifier.name asc"
		rendererProps={{
			title: 'Translation Catalogues',
			actions: <LinkButton to="translations/catalogueCreate">Add a new translation catalogue</LinkButton>,
		}}
	>
		<TableCell>
			<Field field="domain.name" />
		</TableCell>

		<TableCell>
			<Field field="identifier.name" />
		</TableCell>

		<TableCell shrunk>
			<LinkButton to="translations/catalogueEdit(id: $entity.id)">Edit</LinkButton>
		</TableCell>
	</TablePage>
)

export const catalogueCreate = (
	<CreatePage
		entity="TranslationCatalogue"
		rendererProps={{
			title: 'Add a new translation catalogue',
			navigation: <NavigateBackButton to="translations/catalogueList">Translation catalogues</NavigateBackButton>,
		}}
		redirectOnSuccess={request => ({ ...request, pageName: 'translations/catalogueList' })}
	>
		<TranslationCatalogueForm />
	</CreatePage>
)

export const catalogueEdit = (
	<EditPage
		entity="TranslationCatalogue(id = $id)"
		rendererProps={{
			title: 'Edit translation catalogue',
			navigation: <NavigateBackButton to="translations/catalogueList">TranslationCatalogues</NavigateBackButton>,
		}}
	>
		<TranslationCatalogueForm />
	</EditPage>
)
