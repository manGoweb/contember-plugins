import { Component, FieldContainerProps, HasOne, ImageFileRepeater, TextField } from '@contember/admin'

export interface ImageListFieldProps {
	field: string
	label?: FieldContainerProps['label']
	description?: FieldContainerProps['description']
	labelDescription?: FieldContainerProps['labelDescription']
	hideAltField?: boolean
	altLabel?: string
}

export const ImageListField = Component<ImageListFieldProps>(
	({ field, label, description, labelDescription, hideAltField, altLabel }) => {
		const altField = 'image.alt'

		return (
			<HasOne field={field}>
				<ImageFileRepeater
					field="items"
					label={label}
					description={description}
					labelDescription={labelDescription}
					urlField="image.url"
					widthField="image.width"
					heightField="image.height"
					fileSizeField="image.size"
					fileTypeField="image.type"
					sortableBy="order"
				>
					{hideAltField ? undefined : <TextField field={altField} label={altLabel ?? 'Alternative text'} />}
				</ImageFileRepeater>
			</HasOne>
		)
	},
)
