import { Menu } from '@contember/admin'
import { TenantMenuItem } from '../../src/tenant/admin/TenantMenuItem'
import { TranslationsMenuItem } from '../../src/translations/admin/components/TranslationsMenuItem'

export const Navigation = () => (
	<Menu>
		<Menu.Item>
			<Menu.Item title="General" to="general" />
			<Menu.Item title="Generic pages" to="genericPage/list" />
			<TranslationsMenuItem />
			<TenantMenuItem />
		</Menu.Item>
	</Menu>
)
