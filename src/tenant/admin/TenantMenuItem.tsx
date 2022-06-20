import { Component, Menu } from '@contember/admin'

interface TenantMenutItemProps {
	title?: string
}

export const TenantMenuItem = Component<TenantMenutItemProps>(
	({ title }) => <Menu.Item title={title ?? 'Users'} to="tenantUsers" />,
	'TenantMenuItem',
)
