import { Block, Component, DiscriminatedBlocks, HasOne, SelectField, TextField } from '@contember/admin'

export interface LinkFieldProps {
	field: string
}

export const LinkField = Component<LinkFieldProps>(props => {
	return (
		<HasOne field={props.field}>
			<TextField field="title" label="Title" />
			<DiscriminatedBlocks field="type" label="Type">
				<Block discriminateBy="internal" label="Internal">
					<SelectField field="internalLink" label="URL" options="Linkable.url" />
				</Block>
				<Block discriminateBy="external" label="External">
					<TextField field="externalLink" label="URL" />
				</Block>
			</DiscriminatedBlocks>
		</HasOne>
	)
})
