import {
	ActionableBox,
	Box,
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
		const [inputValue, setInputValue] = useState<string | null | undefined>(
			() => fieldValue && `https://www.youtube.com/watch?v=${fieldValue}`,
		)

		const onChange = (value: string | null | undefined) => {
			setInputValue(value)

			if (typeof value === 'string') {
				const id = (() => {
					try {
						const url = new URL(value)
						if (url.host.endsWith('youtube.com')) {
							if (url.pathname.startsWith('/shorts/')) {
								return url.pathname.substring(8)
							}
							return url.searchParams.get('v') || undefined
						} else if (url.host.endsWith('youtu.be')) {
							return url.pathname.substring(1)
						}
					} catch {}
				})()

				if (id) {
					idField.updateValue(id)
				} else {
					idField.updateValue(null)
				}
			}
		}

		const input = (
			<FieldContainer
				label={label}
				description={'YouTube video URL (e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ")'}
			>
				<TextInput value={inputValue} onChange={onChange} />
			</FieldContainer>
		)

		if (fieldValue) {
			return (
				<FieldContainer label={label}>
					<ActionableBox
						onRemove={
							allowDisconnect
								? () => {
										rootEntity.disconnectEntityAtField(field)
								  }
								: undefined
						}
						editContents={<Box>{input}</Box>}
					>
						<div style={{ marginInline: 'auto', width: '100%', maxWidth: '20rem' }}>
							<YoutubeVideoPreview videoId={fieldValue} />
						</div>
					</ActionableBox>
				</FieldContainer>
			)
		}

		return input
	},
	({ field }) => <Field field={`${field}.videoId`} />,
	'YoutubeVideoField',
)
