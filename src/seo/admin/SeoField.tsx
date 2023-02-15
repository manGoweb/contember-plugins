import {
	Box,
	CheckboxField,
	Component,
	DerivedFieldLink,
	DerivedFieldLinkProps,
	Field,
	HasOne,
	TextareaField,
	TextField,
	useMessageFormatter,
} from '@contember/admin'
import { ImageField } from '../../image/admin'

export interface SeoFieldProps {
	field: string
	titleDerivedFrom?: DerivedFieldLinkProps['derivedField']
	descriptionDerivedFrom?: DerivedFieldLinkProps['derivedField']
	options?: {
		isNoIndex?: boolean
		isNoFollow?: boolean
	}
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
		noFollow: {
			label: 'No follow',
			description: 'It disallows search engines from crawling the links on that page.',
		},
		noIndex: {
			label: 'No index',
			description:
				'It tells a search engine that even though it can crawl the page, it cannot add the page into its search index.',
		},
		robots: {
			heading: 'Robots',
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
		noFollow: {
			label: 'No follow',
			description: 'Dáva pokyn aby vyhledávače nebraly v potaz žádný odkaz z obsahu stránky/podstránky',
		},
		noIndex: {
			label: 'No index',
			description: 'Informuje vyhledávače, aby neindexovaly konkrétní webovou stránku.',
		},
		robots: {
			heading: 'Roboti',
		},
	},
}

export const seoDictionary = {
	default: defaultSeoDictionary,
	csCZ: csCZSeoDictionary,
}

export const SeoField = Component<SeoFieldProps>(
	({ titleDerivedFrom, descriptionDerivedFrom, field, options }) => {
		const formatter = useMessageFormatter<SeoDictionary>(defaultSeoDictionary)

		return (
			<Box heading={formatter('seo.heading')}>
				{titleDerivedFrom && <DerivedFieldLink sourceField={titleDerivedFrom} derivedField="seo.title" />}
				{descriptionDerivedFrom && (
					<>
						<DerivedFieldLink sourceField={descriptionDerivedFrom} derivedField="seo.description" />
						<DerivedFieldLink sourceField={descriptionDerivedFrom} derivedField="seo.ogDescription" />
					</>
				)}
				<HasOne field={field}>
					<TextField field="title" label={formatter('seo.title.label')} />
					<TextareaField field="description" label={formatter('seo.description.label')} />
					<TextField field="ogTitle" label={formatter('seo.ogTitle.label')} />
					<TextareaField field="ogDescription" label={formatter('seo.ogDescription.label')} />
					<ImageField
						field="ogImage"
						label={formatter('seo.ogImage.label')}
						description={formatter('seo.ogImage.description')}
					/>
					{options && (
						<Box heading={formatter('seo.robots.heading')}>
							{options.isNoIndex && (
								<CheckboxField
									field="noIndex"
									label={formatter('seo.noIndex.label')}
									labelDescription={formatter('seo.noIndex.description')}
								/>
							)}
							{options.isNoFollow && (
								<CheckboxField
									field="noFollow"
									label={formatter('seo.noFollow.label')}
									labelDescription={formatter('seo.noFollow.description')}
								/>
							)}
						</Box>
					)}
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
			<Field field="noIndex" />
			<Field field="noFollow" />
		</HasOne>
	),
	'SeoField',
)
