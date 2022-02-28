import { Component, Menu } from '@contember/admin'

export const TranslationsMenuItem = Component(
	() => (
		<Menu.Item title="Translations">
			<Menu.Item title="Values" to="translationValue" />
			<Menu.Item title="Domains" to="translationDomainList" />
			<Menu.Item title="Catalogues" to="translationCatalogueList" />
			<Menu.Item title="Catalogue identifiers" to="translationCataloguesIdentifierList" />
		</Menu.Item>
	),
	'TranslationsMenuItem',
)
