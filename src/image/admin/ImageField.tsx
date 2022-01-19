import { Component, ImageUploadField, TextField } from '@contember/admin'

export interface ImageFieldProps {
	field: string
	label?: string
	description?: string
	labelDescription?: string
	hideAltField?: boolean
	altLabel?: string
}

export const ImageField = Component<ImageFieldProps>((props: ImageFieldProps) => {
	const urlField = 'url'
	const altField = `alt`

	return (
		<ImageUploadField
			label={props.label}
			urlField={urlField}
			baseEntity={props.field}
			description={props.description}
			labelDescription={props.labelDescription}
			widthField="width"
			heightField="height"
			fileSizeField="size"
			fileTypeField="type"
		>
			{props.hideAltField ? undefined : <TextField field={altField} label={props.altLabel || 'Alternative text'} />}
		</ImageUploadField>
	)
})
