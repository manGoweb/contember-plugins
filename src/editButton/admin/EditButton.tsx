import { AnchorButton, AnchorButtonProps, LinkButton, RoutingParameter } from '@contember/admin'
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
		<>
			<LinkButton
				to={{ pageName, parameters: { id: new RoutingParameter('entity.id') } }}
				Component={buttonProps =>
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
		</>
	)
}
