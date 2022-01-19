import { Component, FormGroupProps, ImageUploadField, TextField } from '@contember/admin'
import * as React from 'react'

export interface ImageFieldProps {
	field: string
	label?: FormGroupProps['label']
	description?: FormGroupProps['description']
	labelDescription?: FormGroupProps['labelDescription']
	hideAltField?: boolean
	altLabel?: FormGroupProps['label']
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
