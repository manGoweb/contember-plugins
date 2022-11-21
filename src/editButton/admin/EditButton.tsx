import { AnchorButtonProps, Link, LinkButton, RoutingParameter, useEntity } from '@contember/admin'
import * as React from 'react'

export type EditButtonProps = AnchorButtonProps & {
	pageName: string
	unstyled?: boolean
	children?: React.ReactNode
}

export const EditButton: React.ComponentType<EditButtonProps> = ({ pageName, children, unstyled }) => {
	const content = children || 'Edit'
	const to = { pageName, parameters: { id: new RoutingParameter('entity.id') } }

	const { existsOnServer } = useEntity()

	if (unstyled) {
		return existsOnServer ? <Link to={to}>{content}</Link> : <span>{content}</span>
	}
	return (
		<LinkButton to={to} disabled={existsOnServer === false}>
			{content}
		</LinkButton>
	)
}
