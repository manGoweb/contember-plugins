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
import { EditButton } from '../../..'

const TranslationDomainForm = Component(
	() => (
		<Box>
			<TextField field="identifier" label="Identifier" allowNewlines={false} />
			<TextField field="name" label="Name" allowNewlines={false} />
		</Box>
	),
	'TranslationDomainForm',
)

export const TranslationDomainListPage = (
	<TablePage
		pageName="translationDomainList"
		entities="TranslationDomain"
		orderBy="name asc"
		rendererProps={{
			title: 'Translation Domains',
			actions: <LinkButton to="translationDomainCreate">Add a new translation domain</LinkButton>,
		}}
	>
		<TableCell>
			<Field field="name" />
		</TableCell>

		<TableCell shrunk>
			<EditButton pageName="translationDomainEdit" />
		</TableCell>
	</TablePage>
)

export const TranslationDomainCreatePage = (
	<CreatePage
		pageName="translationDomainCreate"
		entity="TranslationDomain"
		rendererProps={{
			title: 'Add a new translation domain',
			navigation: <NavigateBackButton to="translationDomainList">Translation domains</NavigateBackButton>,
		}}
		redirectOnSuccess={request => ({ ...request, pageName: 'translationDomainList' })}
	>
		<TranslationDomainForm />
	</CreatePage>
)

export const TranslationDomainEditPage = (
	<EditPage
		pageName="translationDomainEdit"
		entity="TranslationDomain(id = $id)"
		rendererProps={{
			title: 'Edit translationDomain',
			navigation: <NavigateBackButton to="translationDomainList">TranslationDomains</NavigateBackButton>,
		}}
	>
		<TranslationDomainForm />
	</EditPage>
)
