import { AnchorButton, AnchorButtonProps, PageLinkById } from '@contember/admin'
import * as React from 'react'

export type EditButtonProps = AnchorButtonProps & {
	pageName: string
	unstyled?: boolean
}

export const EditButton: React.ComponentType<EditButtonProps> = ({
	pageName,
	children,
	unstyled,
	...outerButtonProps
}) => {
	const content = children || 'Edit'
	return (
		<PageLinkById
			to={pageName}
			Component={({ isActive, ...buttonProps }) =>
				unstyled ? (
					<a {...buttonProps} {...outerButtonProps}>
						{content}
					</a>
				) : (
					<AnchorButton {...buttonProps} {...outerButtonProps}>
						{content}
					</AnchorButton>
				)
			}
		/>
	)
}
