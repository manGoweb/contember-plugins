import {
	ActionableBox,
	Block,
	Box,
	CheckboxField,
	Component,
	DiscriminatedBlocks,
	Field,
	FieldView,
	HasOne,
	SelectField,
	Stack,
	TextField,
	useEntity,
} from '@contember/admin'
import { Gap } from '../../gap/admin'

export interface LinkFieldProps {
	field: string
	label?: string
	titleField?: boolean
	allowDisconnect?: boolean
	allowTargetBlank?: boolean
	compact?: boolean
}

const titleFieldDefaultValue = true
const allowTargetBlankDefaultValue = false

export const LinkField = Component<LinkFieldProps>(
	({
		field,
		label,
		titleField = titleFieldDefaultValue,
		allowDisconnect = false,
		allowTargetBlank = allowTargetBlankDefaultValue,
		compact = true,
	}) => {
		const rootEntity = useEntity()

		const insideContent = (
			<HasOne field={field}>
				{titleField && <TextField field="title" label="Title" />}
				<Stack direction={compact ? 'horizontal' : 'vertical'}>
					<DiscriminatedBlocks field="type" label="Type">
						<Block discriminateBy="internal" label="Internal">
							<SelectField field="internalLink" label="URL" options="Linkable.url" />
						</Block>
						<Block discriminateBy="external" label="External">
							<TextField field="externalLink" label="URL" />
						</Block>
					</DiscriminatedBlocks>
				</Stack>
				{allowTargetBlank && (
					<>
						<Gap />
						<CheckboxField
							field="isTargetBlank"
							label="Target blank"
							defaultValue={false}
							labelDescription={
								<FieldView<boolean>
									field="isTargetBlank"
									render={field => (
										<>
											Force link to open in new tab.
											{field.value && (
												<>
													{' '}
													<span style={{ color: 'red' }}>
														This feature is highly discouraged.{' '}
														<a href="https://css-tricks.com/use-target_blank/" target="_blank" rel="noreferrer">
															Read more
														</a>
														.
													</span>
												</>
											)}
										</>
									)}
								/>
							}
						/>
					</>
				)}
			</HasOne>
		)

		const content = label ? <Box heading={label}>{insideContent}</Box> : insideContent

		if (allowDisconnect) {
			return <ActionableBox onRemove={() => rootEntity.disconnectEntityAtField(field)}>{content}</ActionableBox>
		}

		return content
	},
	({ field, titleField = titleFieldDefaultValue, allowTargetBlank = allowTargetBlankDefaultValue }) => (
		<HasOne field={field}>
			<Field field="type" />
			{titleField && <Field field="title" />}
			{allowTargetBlank && <Field field="isTargetBlank" />}
			<SelectField field="internalLink" label={undefined} options="Linkable.url" />
			<Field field="externalLink" />
		</HasOne>
	),
)
