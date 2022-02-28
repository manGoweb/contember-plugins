import {
	Box,
	Button,
	Component,
	CreateNewEntityButton,
	DataBindingProvider,
	DeleteEntityButton,
	DimensionsSwitcher,
	Entity,
	EntityAccessor,
	EntityListAccessor,
	EntityListSubTree,
	Environment,
	FeedbackRenderer,
	Field,
	GenericPage,
	PersistButton,
	TextField,
	TextInput,
	useEnvironment,
} from '@contember/admin'
import { default as React, Dispatch, memo, SetStateAction, useCallback, useMemo, useState } from 'react'
import { WaitForDimensions } from '../components/WaitForDimensions'
import { CatalogueQueryEntry, useCatalogueQuery } from '../hooks/catalogueQuery'

type Filter = {
	key: string
	values: {
		[catalogue: string]: string
	}
}

const queryMatch = (query: string, s: string | null): boolean => {
	const normalizedQuery = query.trim().toLowerCase()
	const normalizedString = (s ?? '').trim().toLowerCase()

	return normalizedString.includes(normalizedQuery)
}

const filterMatch = (entity: EntityAccessor, filter: Filter, domain: string): boolean => {
	if (!entity.existsOnServer) {
		return true
	}

	const identifier = entity.getField<string>('identifier')
	const note = entity.getField<string>('note')
	if (!queryMatch(filter.key, identifier.value) && !queryMatch(filter.key, note.value)) {
		return false
	}

	for (const catalogue in filter.values) {
		const query = filter.values[catalogue]
		const valueEntity = entity.getEntity({
			field: {
				field: 'values',
				reducedBy: {
					catalogue: {
						identifier: catalogue,
						domain: { identifier: domain },
					},
				},
			},
		})

		if (!(valueEntity instanceof EntityAccessor)) {
			return false
		}

		const valueField = valueEntity.getField<string>('value')
		if (!queryMatch(query, valueField.value)) {
			return false
		}
	}

	return true
}

const pageMatch = (entity: EntityAccessor, index: number, page: number, limit: number): boolean => {
	return (index >= page * limit && index < (page + 1) * limit) || !entity.existsOnServer
}

type TableHeadProps = {
	domain: string
	catalogues: string[]
	filter: Filter
	setFilter: Dispatch<SetStateAction<Filter>>
	setPage: Dispatch<SetStateAction<number>>
}
const TableHead = memo(({ domain, catalogues, filter, setFilter, setPage }: TableHeadProps) => {
	const onKeyChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setFilter((prev: Filter) => ({ ...prev, key: value }))
			setPage(0)
		},
		[setFilter, setPage],
	)

	const onValueChange = useCallback(
		(catalogue: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setFilter((prev: Filter) => ({ ...prev, values: { ...prev.values, [catalogue]: value } }))
			setPage(0)
		},
		[setFilter, setPage],
	)

	const catalogueNames = useCatalogueQuery({ domain, catalogues })

	const getCatalogueName = (catalogue: string): string => {
		return (
			catalogueNames?.find((it: CatalogueQueryEntry) => it.identifier.code === catalogue)?.identifier.name ?? catalogue
		)
	}

	return (
		<thead>
			<tr>
				<th>Key</th>
				{catalogues.map((catalogue: string) => (
					<th key={catalogue}>{getCatalogueName(catalogue)}</th>
				))}
				<th>&nbsp;</th>
			</tr>
			<tr>
				<td>
					<TextInput
						value={filter.key ?? ''}
						onChange={onKeyChange}
						allowNewlines={false}
						placeholder="filter key or note"
					/>
				</td>

				{catalogues.map((catalogue: string) => (
					<td key={catalogue}>
						<TextInput
							value={filter.values?.[catalogue] ?? ''}
							onChange={onValueChange(catalogue)}
							allowNewlines={false}
							placeholder={`filter ${getCatalogueName(catalogue)} values`}
						/>
					</td>
				))}

				<td>&nbsp;</td>
			</tr>
		</thead>
	)
})
TableHead.displayName = 'TableHead'

type TablePaginatorProps = {
	pageCount: number
	page: number
	setPage: Dispatch<SetStateAction<number>>
	limit: number
	setLimit: Dispatch<SetStateAction<number>>
}

const TablePaginator = memo(({ pageCount, page, setPage, limit, setLimit }: TablePaginatorProps) => {
	const prevClick = useCallback(() => setPage(page - 1), [page, setPage])
	const nextClick = useCallback(() => setPage(page + 1), [page, setPage])

	const limitChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setLimit(Number.parseInt(e.target.value)),
		[setLimit],
	)

	return (
		<div className="translation-paginator">
			<Button onClick={prevClick} disabled={page === 0}>
				Prev
			</Button>
			<div>
				{page + 1} / {pageCount}
			</div>
			<Button onClick={nextClick} disabled={page === pageCount - 1}>
				Next
			</Button>
			<div className="translation-limit">
				<TextInput value={limit.toString()} onChange={limitChange} allowNewlines={false} />
			</div>
		</div>
	)
})
TablePaginator.displayName = 'TablePaginator'

type TableRowProps = {
	entity: EntityAccessor
	catalogues: string[]
}

const TableRow = memo(({ entity, catalogues }: TableRowProps) => (
	<Entity accessor={entity}>
		<tr>
			<td>
				<TextField field="identifier" label={undefined} allowNewlines={false} />

				<div className="translation-note">
					<TextField field="note" label={undefined} allowNewlines={true} placeholder="optional note" />
				</div>
			</td>

			{catalogues.map((identifier: string) => (
				<td key={identifier}>
					<TextField
						field={`values(catalogue.identifier.code = '${identifier}', catalogue.domain.identifier = $domain).value`}
						label={undefined}
						allowNewlines={true}
					/>
				</td>
			))}

			<td>
				<DeleteEntityButton />
			</td>
		</tr>
	</Entity>
))
TableRow.displayName = 'TableRow'

const useEntitiesMatchingFilter = (entities: EntityAccessor[], filter: Filter, domain: string): EntityAccessor[] => {
	return useMemo(() => entities.filter(entity => filterMatch(entity, filter, domain)), [entities, filter, domain])
}

const useEntitiesMatchingPage = (entities: EntityAccessor[], page: number, limit: number): EntityAccessor[] => {
	return useMemo(() => entities.filter((entity, i) => pageMatch(entity, i, page, limit)), [entities, page, limit])
}

const TranslationTable = Component<{ accessor: EntityListAccessor }>(
	props => {
		const accessorTree = props.accessor
		const getAccessorTree = accessorTree.getAccessor
		const environment = useEnvironment()
		const domain = environment.getDimension('domain')[0]
		const catalogues = environment.getDimension('catalogue')

		const [filter, setFilter] = useState<Filter>({ key: '', values: {} })
		const [page, setPage] = useState<number>(0)
		const [limit, setLimit] = useState<number>(50)

		const entities = Array.from(accessorTree)
		const matchingFilter = useEntitiesMatchingFilter(entities, filter, domain)
		const matchingPage = useEntitiesMatchingPage(matchingFilter, page, limit)
		const pageCount = Math.ceil(matchingFilter.length / limit)

		const addNewTranslation = React.useCallback(
			(initialize?: EntityAccessor.BatchUpdatesHandler) => {
				getAccessorTree().createNewEntity(initialize)
			},
			[getAccessorTree],
		)

		return (
			<>
				{entities.length > limit && (
					<TablePaginator page={page} pageCount={pageCount} setPage={setPage} limit={limit} setLimit={setLimit} />
				)}

				<Box distinction="seamless">
					<table className="translation-values-grid">
						<TableHead
							domain={domain}
							catalogues={catalogues}
							filter={filter}
							setFilter={setFilter}
							setPage={setPage}
						/>

						<tbody>
							{matchingPage.map(entity => (
								<TableRow key={entity.key} entity={entity} catalogues={catalogues} />
							))}
						</tbody>
					</table>
				</Box>

				<CreateNewEntityButton createNewEntity={addNewTranslation}>Add new translation</CreateNewEntityButton>
				<PersistButton />
			</>
		)
	},
	(_, env: Environment) => (
		<>
			<Field field="identifier" />
			<Field field="note" />
			<Field field="contentType" defaultValue="textPlain" />

			{env.getDimension('catalogue').map((identifier: string) => (
				<Field
					key={identifier}
					field={`values(catalogue.identifier.code = '${identifier}', catalogue.domain.identifier = $domain).value`}
				/>
			))}
		</>
	),
	'TranslationTable',
)

export const TranslationValuePage = (
	<GenericPage pageName="translationValue" title="Translation Values">
		<div className="translation-dimensions">
			<DimensionsSwitcher
				optionEntities="TranslationDomain"
				orderBy="name asc"
				dimension="domain"
				labelField="name"
				slugField="identifier"
				maxItems={1}
			/>

			<WaitForDimensions dim={['domain']}>
				<DimensionsSwitcher
					optionEntities="TranslationCatalogue[domain.identifier = $domain]"
					orderBy="identifier.name asc"
					dimension="catalogue"
					labelField="identifier.name"
					slugField="identifier.code"
					maxItems={12}
				/>
			</WaitForDimensions>
		</div>

		<WaitForDimensions dim={['domain', 'catalogue']}>
			<DataBindingProvider stateComponent={FeedbackRenderer}>
				<EntityListSubTree
					entities="TranslationKey[domain.identifier = $domain]"
					orderBy="identifier"
					setOnCreate="(domain.identifier = $domain)"
					listComponent={TranslationTable}
				/>
			</DataBindingProvider>
		</WaitForDimensions>
	</GenericPage>
)
