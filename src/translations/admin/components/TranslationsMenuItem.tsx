import { Component, Menu } from '@contember/admin'

export interface TranslationsMenuItemProps {
	omitCatalogueIdentifiers?: boolean
}

export const TranslationsMenuItem = Component<TranslationsMenuItemProps>(
	({ omitCatalogueIdentifiers }) => (
		<Menu.Item title="Translations">
			<Menu.Item title="Values" to="translationValue" />
			<Menu.Item title="Domains" to="translationDomainList" />
			<Menu.Item title="Catalogues" to="translationCatalogueList" />
			{omitCatalogueIdentifiers || <Menu.Item title="Catalogue identifiers" to="translationCataloguesIdentifierList" />}
		</Menu.Item>
	),
	'TranslationsMenuItem',
)
