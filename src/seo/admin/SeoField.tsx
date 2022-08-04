import {
	Box,
	CheckboxField,
	Component,
	DerivedFieldLink,
	DerivedFieldLinkProps,
	Field,
	HasOne,
	TextAreaField,
	TextField,
	useMessageFormatter,
} from '@contember/admin'
import { ImageField } from '../../image/admin'

export interface SeoFieldProps {
	field: string
	titleDerivedFrom?: DerivedFieldLinkProps['derivedField']
	descriptionDerivedFrom?: DerivedFieldLinkProps['derivedField']
	options?: boolean
}

const defaultSeoDictionary = {
	seo: {
		heading: 'SEO',
		title: {
			label: 'Title',
		},
		description: {
			label: 'Description',
		},
		ogTitle: {
			label: 'OG title',
		},
		ogDescription: {
			label: 'OG description',
		},
		ogImage: {
			label: 'OG image',
			description: 'Recommended aspect ratio 19:10. E.g. 2400×1260 px.',
		},
		options: {
			noFollow: {
				label: 'No follow',
				description: 'It disallows search engines from crawling the links on that page.',
			},
			noIndex: {
				label: 'No index',
				description:
					'It tells a search engine that even though it can crawl the page, it cannot add the page into its search index.',
			},
		},
	},
}
type SeoDictionary = typeof defaultSeoDictionary

const csCZSeoDictionary: SeoDictionary = {
	seo: {
		heading: 'SEO',
		title: {
			label: 'Nadpis',
		},
		description: {
			label: 'Popis',
		},
		ogTitle: {
			label: 'OG nadpis',
		},
		ogDescription: {
			label: 'OG popis',
		},
		ogImage: {
			label: 'OG obrázek',
			description: 'Doporučený poměr stran 19:10. Například 2400×1260 px.',
		},
		options: {
			noFollow: {
				label: 'No follow',
				description: 'Dáva pokyn aby vyhledávače nebraly v potaz žádný odkaz z obsahu stránky/podstránky',
			},
			noIndex: {
				label: 'No index',
				description: 'Informuje vyhledávače, aby neindexovaly konkrétní webovou stránku.',
			},
		},
	},
}

export const seoDictionary = {
	default: defaultSeoDictionary,
	csCZ: csCZSeoDictionary,
}

export const SeoField = Component<SeoFieldProps>(
	props => {
		const formatter = useMessageFormatter<SeoDictionary>(defaultSeoDictionary)

		return (
			<Box heading={formatter('seo.heading')}>
				{props.titleDerivedFrom && <DerivedFieldLink sourceField={props.titleDerivedFrom} derivedField="seo.title" />}
				{props.descriptionDerivedFrom && (
					<>
						<DerivedFieldLink sourceField={props.descriptionDerivedFrom} derivedField="seo.description" />
						<DerivedFieldLink sourceField={props.descriptionDerivedFrom} derivedField="seo.ogDescription" />
					</>
				)}
				<HasOne field={props.field}>
					{props.options && (
						<HasOne field="options">
							<CheckboxField
								field="noIndex"
								label={formatter('seo.options.noIndex.label')}
								labelDescription={formatter('seo.options.noIndex.description')}
							/>
							<CheckboxField
								field="noFollow"
								label={formatter('seo.options.noFollow.label')}
								labelDescription={formatter('seo.options.noFollow.description')}
							/>
						</HasOne>
					)}
					<TextField field="title" label={formatter('seo.title.label')} />
					<TextAreaField field="description" label={formatter('seo.description.label')} />
					<TextField field="ogTitle" label={formatter('seo.ogTitle.label')} />
					<TextAreaField field="ogDescription" label={formatter('seo.ogDescription.label')} />
					<ImageField
						field="ogImage"
						label={formatter('seo.ogImage.label')}
						description={formatter('seo.ogImage.description')}
					/>
				</HasOne>
			</Box>
		)
	},
	props => (
		<HasOne field={props.field}>
			<Field field="title" />
			<Field field="description" />
			<Field field="ogTitle" />
			<Field field="ogDescription" />
			<ImageField field="ogImage" />
			<HasOne field="options">
				<Field field="noIndex" />
				<Field field="noFollow" />
			</HasOne>
		</HasOne>
	),
	'SeoField',
)
