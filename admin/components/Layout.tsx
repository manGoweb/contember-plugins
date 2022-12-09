import { Layout as ContemberLayout } from '@contember/admin'
import type { ReactNode } from 'react'
import { Navigation } from './Navigation'

export const Layout = (props: { children?: ReactNode }) => (
	<ContemberLayout sidebarHeader="Contember" navigation={<Navigation />}>
		{props.children}
	</ContemberLayout>
)
