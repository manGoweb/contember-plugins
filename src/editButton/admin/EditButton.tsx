import { AnchorButtonProps, Link, LinkButton, RoutingParameter } from '@contember/admin'
import * as React from 'react'

export type EditButtonProps = AnchorButtonProps & {
	pageName: string
	unstyled?: boolean
}

export const EditButton: React.ComponentType<EditButtonProps> = ({ pageName, children, unstyled }) => {
	const content = children || 'Edit'
	const to = { pageName, parameters: { id: new RoutingParameter('entity.id') } }

	if (unstyled) {
		return <Link to={to}>{content}</Link>
	}
	return <LinkButton to={to}>{content}</LinkButton>
}
