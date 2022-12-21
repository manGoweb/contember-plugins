import { useAuthedContentQuery } from '@contember/admin'

const CATALOGUES_QUERY = /* GraphQL */ `
	query ($domain: String!, $catalogues: [String!]!) {
		list: listTranslationCatalogue(
			filter: { domain: { identifier: { eq: $domain } }, identifier: { code: { in: $catalogues } } }
		) {
			identifier {
				name
				code
			}
		}
	}
`

export type CatalogueQueryEntry = { identifier: { code: string; name: string } }
export type CatalogueQueryResult = { list: CatalogueQueryEntry[] }
export type CatalogueQueryVariables = { domain: string; catalogues: string[] }

export const useCatalogueQuery = (variables: CatalogueQueryVariables): CatalogueQueryEntry[] | undefined => {
	const response = useAuthedContentQuery<CatalogueQueryResult, CatalogueQueryVariables>(CATALOGUES_QUERY, variables)
	return response.state.state === 'success' ? response.state.data?.list : undefined
}
