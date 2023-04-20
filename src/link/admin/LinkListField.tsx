import { Component, HasOne, Repeater } from '@contember/admin'
import { LinkField } from './LinkField'

export interface LinkListFieldProps {
	field: string
	label?: string
	allowTargetBlank?: boolean
}

export const LinkListField = Component<LinkListFieldProps>(({ field, label = 'Links', allowTargetBlank }) => (
	<HasOne field={field}>
		<Repeater field="items" sortableBy="order" label={label} addButtonText="Add link">
			<LinkField field="link" label="Link" allowDisconnect={false} allowTargetBlank={allowTargetBlank} />
		</Repeater>
	</HasOne>
))
