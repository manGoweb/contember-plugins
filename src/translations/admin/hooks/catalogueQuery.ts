import { useAuthedContentQuery } from '@contember/admin'

const CATALOGUES_QUERY = `
	query($domain: String!, $catalogues: [String!]!) {
		list: listTranslationCatalogue(
			filter: {
				domain: { identifier: { eq: $domain } },
				identifier: { in: $catalogues }
			}
		) {
			identifier
			name
		}
	}
`

export type CatalogueQueryEntry = { identifier: string; name: string }
export type CatalogueQueryResult = { list: CatalogueQueryEntry[] }
export type CatalogueQueryVariables = { domain: string; catalogues: string[] }

export const useCatalogueQuery = (variables: CatalogueQueryVariables): CatalogueQueryEntry[] | undefined => {
	const response = useAuthedContentQuery<CatalogueQueryResult, CatalogueQueryVariables>(CATALOGUES_QUERY, variables)
	return response.state.state === 'success' ? response.state.data?.list : undefined
}
