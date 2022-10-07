import {
	ActionableBox,
	Component,
	Field,
	FieldContainer,
	FieldContainerProps,
	TextInput,
	useEntity,
} from '@contember/admin'
import { useState } from 'react'
import { YoutubeVideoPreview } from './YoutubeVideoPreview'

export interface YoutubeVideoFieldProps {
	field: string
	label?: FieldContainerProps['label']
	allowDisconnect?: boolean
}

export const YoutubeVideoField = Component<YoutubeVideoFieldProps>(
	({ field, label, allowDisconnect = false }) => {
		const rootEntity = useEntity()
		const entity = rootEntity.getEntity(field)
		const idField = entity.getField<string>('videoId')
		const fieldValue = idField.value
		const [inputValue, setInputValue] = useState<string | null | undefined>('')

		const onChange = (value: string | null | undefined) => {
			setInputValue(value)

			if (typeof value === 'string') {
				const id = (() => {
					try {
						const url = new URL(value)
						if (url.host.endsWith('youtube.com')) {
							return url.searchParams.get('v') || undefined
						} else if (url.host.endsWith('youtu.be')) {
							return url.pathname.substring(1)
						}
					} catch {}
				})()

				if (id) {
					idField.updateValue(id)
				}
			}
		}

		if (fieldValue) {
			const preview = (
				<FieldContainer label={label}>
					<YoutubeVideoPreview videoId={fieldValue} />
				</FieldContainer>
			)
			return (
				<div
					style={{
						maxWidth: '300px',
						marginTop: '1em',
					}}
				>
					{allowDisconnect ? (
						<ActionableBox
							onRemove={() => {
								rootEntity.disconnectEntityAtField(field)
							}}
						>
							{preview}
						</ActionableBox>
					) : (
						preview
					)}
				</div>
			)
		}

		return (
			<FieldContainer
				label={label}
				description={'YouTube video URL (e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ")'}
			>
				<TextInput value={inputValue} onChange={onChange} />
			</FieldContainer>
		)
	},
	({ field }) => <Field field={`${field}.videoId`} />,
	'YoutubeVideoField',
)
