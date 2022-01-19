import { Component, FieldContainerProps, SlugField, SlugFieldProps } from '@contember/admin'

export interface UrlFieldProps extends Partial<SlugFieldProps> {
	field: string
	derivedFrom: SlugFieldProps['derivedFrom']
	softPrefix?: string
	label: FieldContainerProps['label']
	baseUrlEnvironmentName?: string
}

export const UrlField = Component<UrlFieldProps>(
	({ field, derivedFrom, label, softPrefix, baseUrlEnvironmentName, ...props }) => (
		<SlugField
			field={`${field}.url`}
			derivedFrom={derivedFrom}
			label={label}
			unpersistedHardPrefix={
				baseUrlEnvironmentName && (environment => environment.getValue(baseUrlEnvironmentName) ?? '')
			}
			persistedHardPrefix="/"
			persistedSoftPrefix={softPrefix}
			linkToExternalUrl={baseUrlEnvironmentName !== undefined}
			{...props}
		/>
	),
	'UrlField',
)
