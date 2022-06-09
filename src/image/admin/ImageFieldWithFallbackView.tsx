import { Component, ImageFieldView, ImageFieldViewProps } from '@contember/admin'
import type { FunctionComponent } from 'react'
import { Resize } from 'snappyimg'
import { buildSnappyimgUrl } from './buildSnappyimgUrl'

export type ImageFieldWithFallbackViewProps = Partial<ImageFieldViewProps> & Pick<ImageFieldViewProps, 'srcField'>

export const ImageFieldWithFallbackView = Component<ImageFieldWithFallbackViewProps>(props => {
	return (
		<ImageFieldView
			formatUrl={srcFieldValue =>
				buildSnappyimgUrl(srcFieldValue, {
					resize: Resize.Fit,
					width: 2 * parseInt(`${props.width || 28}`),
					height: 2 * parseInt(`${props.height || 28}`),
				})
			}
			width={28}
			height={28}
			style={{ objectFit: 'contain', display: 'block', objectPosition: 'center' }}
			fallback={
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						opacity: '0.3',
						minHeight: `${props.height}px`,
					}}
				>
					<ImagePlaceholder />
				</div>
			}
			{...props}
		/>
	)
})

export const ImagePlaceholder: FunctionComponent = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path
			d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"
			fill="currentColor"
		/>
	</svg>
)
