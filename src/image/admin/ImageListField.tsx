import { Component, FieldContainerProps, HasOne, ImageFileRepeater } from '@contember/admin'

export interface ImageListFieldProps {
	field: string
	label?: FieldContainerProps['label']
	description?: FieldContainerProps['description']
	labelDescription?: FieldContainerProps['labelDescription']
}

export const ImageListField = Component<ImageListFieldProps>(({ field, label, description, labelDescription }) => {
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
				/* @TODO: type field */
				sortableBy="order"
			/>
		</HasOne>
	)
})
