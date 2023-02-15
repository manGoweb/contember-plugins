import {
	Component,
	CreatePage,
	DataGridPage,
	EditPage,
	GenericCell,
	LinkButton,
	NavigateBackButton,
	SlugField,
	TextCell,
	TextField,
} from '@contember/admin'
import { EditButton, SeoField } from '../../src/'

export const list = () => (
	<DataGridPage
		entities="GenericPage"
		itemsPerPage={50}
		rendererProps={{
			title: 'Generic pages',
			actions: <LinkButton to="genericPage/create">Add generic page</LinkButton>,
		}}
	>
		<TextCell field="title" header="Title" />
		<GenericCell canBeHidden={false} justification="justifyEnd" shrunk>
			<EditButton pageName="genericPage/edit">Edit</EditButton>
		</GenericCell>
	</DataGridPage>
)

const Form = Component(() => (
	<>
		<TextField field="title" label="Title" />
		<SlugField label="URL" field="link.url" derivedFrom="title" persistedHardPrefix="/" />
		<SeoField
			field="seo"
			titleDerivedFrom="title"
			options={{
				isNoIndex: true,
				isNoFollow: true,
			}}
		/>
	</>
))

export const create = (
	<CreatePage
		entity="GenericPage"
		rendererProps={{
			title: 'Add a new generic page',
			navigation: <NavigateBackButton to="genericPage/list">Generic pages</NavigateBackButton>,
		}}
		redirectOnSuccess={(request, id) => ({
			...request,
			pageName: 'genericPage/edit',
			parameters: {
				id,
			},
		})}
	>
		<Form />
	</CreatePage>
)

export const edit = (
	<EditPage
		entity="GenericPage(id=$id)"
		rendererProps={{
			title: 'Edit generic page',
			navigation: <NavigateBackButton to="genericPage/list">Generic pages</NavigateBackButton>,
		}}
	>
		<Form />
	</EditPage>
)
