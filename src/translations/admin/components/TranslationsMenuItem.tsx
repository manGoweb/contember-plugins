import { Component, Menu } from '@contember/admin'

export interface TranslationsMenuItemProps {
	omitCatalogueIdentifiers?: boolean
}

export const TranslationsMenuItem = Component<TranslationsMenuItemProps>(
	({ omitCatalogueIdentifiers }) => (
		<Menu.Item title="Translations">
			<Menu.Item title="Values" to="translations/value" />
			<Menu.Item title="Domains" to="translations/domainList" />
			<Menu.Item title="Catalogues" to="translations/catalogueList" />
			{omitCatalogueIdentifiers || (
				<Menu.Item title="Catalogue identifiers" to="translations/catalogueIdentifierList" />
			)}
		</Menu.Item>
	),
	'TranslationsMenuItem',
)
