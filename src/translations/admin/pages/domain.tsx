import {
	Box,
	Component,
	CreatePage,
	EditPage,
	Field,
	LinkButton,
	NavigateBackButton,
	TableCell,
	TablePage,
	TextField,
} from '@contember/admin'

const TranslationDomainForm = Component(
	() => (
		<Box>
			<TextField field="identifier" label="Identifier" />
			<TextField field="name" label="Name" />
		</Box>
	),
	'TranslationDomainForm',
)

export const domainList = (
	<TablePage
		entities="TranslationDomain"
		orderBy="name asc"
		rendererProps={{
			title: 'Translation Domains',
			actions: <LinkButton to="translations/domainCreate">Add a new translation domain</LinkButton>,
		}}
	>
		<TableCell>
			<Field field="name" />
		</TableCell>

		<TableCell shrunk>
			<LinkButton to="translations/domainEdit(id: $entity.id)">Edit</LinkButton>
		</TableCell>
	</TablePage>
)

export const domainCreate = (
	<CreatePage
		entity="TranslationDomain"
		rendererProps={{
			title: 'Add a new translation domain',
			navigation: <NavigateBackButton to="translations/domainList">Translation domains</NavigateBackButton>,
		}}
		redirectOnSuccess={request => ({ ...request, pageName: 'translations/domainList' })}
	>
		<TranslationDomainForm />
	</CreatePage>
)

export const domainEdit = (
	<EditPage
		entity="TranslationDomain(id = $id)"
		rendererProps={{
			title: 'Edit translation domain',
			navigation: <NavigateBackButton to="translations/domainList">TranslationDomains</NavigateBackButton>,
		}}
	>
		<TranslationDomainForm />
	</EditPage>
)
