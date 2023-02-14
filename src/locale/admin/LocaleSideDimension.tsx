import { Component, SideDimensions, SideDimensionsProps } from '@contember/admin'

export interface LocaleSideDimensionProps {
	children: React.ReactNode
	hasOneField?: SideDimensionsProps['hasOneField']
}

export const LocaleSideDimension = Component<LocaleSideDimensionProps>(
	({ children, hasOneField = 'locales(locale.code=$currentLocaleCode)' }) => (
		<SideDimensions
			dimension="locale"
			variableName="currentLocaleCode"
			hasOneField={hasOneField}
			// @TODO: uncomment and fix
			// variables={currentLocaleCode => {
			// 	const slugPrefix = currentLocaleCode === 'cs' ? '/' : `/${currentLocaleCode}/`

			// 	return {
			// 		labelMiddleware: label => (
			// 			<>
			// 				<Variable name="flag" /> {label}
			// 			</>
			// 		),
			// 		slugPrefix,
			// 	}
			// }}
		>
			{children}
		</SideDimensions>
	),
)
