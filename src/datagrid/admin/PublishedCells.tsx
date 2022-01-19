import { Component, DateCell } from '@contember/admin'
import { IsPublishedCell } from './IsPublishedCell'

export interface PublishedCellsProps {
	field?: string
}

export const PublishedCells = Component<PublishedCellsProps>(({ field = 'publishedAt' }: PublishedCellsProps) => {
	return (
		<>
			<DateCell field={field} header="Published at" justification="justifyEnd" shrunk initialOrder="desc" />
			<IsPublishedCell field={field} />
		</>
	)
})
