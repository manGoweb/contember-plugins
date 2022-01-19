import { Component, HasOne, Repeater } from '@contember/admin'
import { YoutubeVideoField } from './YoutubeVideoField'

export interface YoutubeVideoListFieldProps {
	field: string
	label?: string
}

export const YoutubeVideoListField = Component<YoutubeVideoListFieldProps>(props => (
	<HasOne field={props.field}>
		<Repeater field="items" sortableBy="order" label={props.label}>
			<YoutubeVideoField field="youtube" />
		</Repeater>
	</HasOne>
))
