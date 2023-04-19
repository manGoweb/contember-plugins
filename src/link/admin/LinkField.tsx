import {
	ActionableBox,
	Block,
	Box,
	CheckboxField,
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
	allowTargetBlank?: boolean
}

export const LinkField = Component<LinkFieldProps>(
	({ field, label, titleField = true, allowDisconnect = false, allowTargetBlank = false }) => {
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
				{allowTargetBlank && (
					<CheckboxField
						field="isTargetBlank"
						label="Target blank"
						defaultValue={false}
						labelDescription={
							<>
								Force link to open in new tab.{' '}
								<span style={{ color: 'red' }}>
									This feature is highly discouraged.{' '}
									<a href="https://css-tricks.com/use-target_blank/" target="_blank" rel="noreferrer">
										Read more
									</a>
									.
								</span>
							</>
						}
					/>
				)}
			</HasOne>
		)

		const content = label ? <Box heading={label}>{insideContent}</Box> : insideContent

		if (allowDisconnect) {
			return <ActionableBox onRemove={() => rootEntity.disconnectEntityAtField(field)}>{content}</ActionableBox>
		}

		return content
	},
	({ field }) => (
		<HasOne field={field}>
			<Field field="type" />
			<Field field="title" />
			<Field field="isTargetBlank" />
			<SelectField field="internalLink" label={undefined} options="Linkable.url" />
			<Field field="externalLink" />
		</HasOne>
	),
)
