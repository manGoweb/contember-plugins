import {
	TranslationCatalogueCreatePage,
	TranslationCatalogueEditPage,
	TranslationCatalogueListPage,
} from './pages/catalogue'
import { TranslationCatalogueIdentifierListPage } from './pages/catalogueIdentifier'
import { TranslationDomainCreatePage, TranslationDomainEditPage, TranslationDomainListPage } from './pages/domain'
import { TranslationValuePage } from './pages/value'

export const translationPages = [
	TranslationCatalogueIdentifierListPage,
	TranslationCatalogueListPage,
	TranslationCatalogueCreatePage,
	TranslationCatalogueEditPage,
	TranslationDomainListPage,
	TranslationDomainCreatePage,
	TranslationDomainEditPage,
	TranslationValuePage,
]
