import { Component, Field, FieldView } from '@contember/admin'
import { ReactNode } from 'react'

export const DiscriminatedByBooleanField = Component<{
	booleanField: string
	children: ReactNode
	condition?: (value: boolean | null) => boolean
}>(
	({ booleanField, children, condition }) => (
		<FieldView<boolean>
			field={booleanField}
			render={acc => {
				if (condition ? condition(acc.value) : acc.value) {
					return children
				}
			}}
		/>
	),
	({ booleanField, children }) => (
		<>
			<Field field={booleanField} />
			{children}
		</>
	),
)
