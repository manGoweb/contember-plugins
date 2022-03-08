import {
	ActionableBox,
	Block,
	Box,
	Component,
	DiscriminatedBlocks,
	Field,
	HasOne,
	SelectField,
	TextField,
	useEntity,
} from '@contember/admin'

export interface LinkFieldProps {
	field: string
	label?: string
	titleField?: boolean
	allowDisconnect?: boolean
}

export const LinkField = Component<LinkFieldProps>(
	({ field, label, titleField = true, allowDisconnect = false }) => {
		const rootEntity = useEntity()

		const insideContent = (
			<HasOne field={field}>
				{titleField && <TextField field="title" label="Title" />}
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

		const content = label ? <Box heading={label}>{insideContent}</Box> : insideContent

		if (allowDisconnect) {
			return <ActionableBox onRemove={() => rootEntity.disconnectEntityAtField(field)}>{content}</ActionableBox>
		}

		return content
	},
	({ field, titleField = true }) => (
		<HasOne field={field}>
			<Field field="type" />
			{titleField && <Field field="title" />}
			<SelectField field="internalLink" label={undefined} options="Linkable.url" />
			<Field field="externalLink" />
		</HasOne>
	),
)
