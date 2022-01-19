import { Component, FieldView, GenericCell, Icon } from '@contember/admin'

export interface IsPublishedCellProps {
	field?: string
}

export const IsPublishedCell = Component<IsPublishedCellProps>(({ field = 'publishedAt' }: IsPublishedCellProps) => {
	return (
		<GenericCell header="Published" justification="justifyCenter" shrunk>
			<FieldView<string>
				field={field}
				render={({ value }) =>
					value && new Date(value).getTime() < new Date().getTime() ? (
						<span style={{ color: '#71bd1e' }}>
							<Icon blueprintIcon="tick" />
						</span>
					) : (
						<span style={{ opacity: 0.4 }}>
							<Icon blueprintIcon="cross" />
						</span>
					)
				}
			/>
		</GenericCell>
	)
})
