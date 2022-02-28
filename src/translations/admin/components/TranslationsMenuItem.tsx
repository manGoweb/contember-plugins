import { Component, Menu } from '@contember/admin'
import * as React from 'react'

export const TranslationsMenuItem = Component(
	props => (
		<Menu.Item title="Translations">
			<Menu.Item title="Values" to="translationValue" />
			<Menu.Item title="Domains" to="translationDomainList" />
			<Menu.Item title="Catalogues" to="translationCatalogueList" />
		</Menu.Item>
	),
	'TranslationsMenuItem',
)
