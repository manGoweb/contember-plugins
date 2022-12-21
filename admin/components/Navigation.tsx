import { Menu } from '@contember/admin'
import { TranslationsMenuItem } from '../../src/translations/admin/components/TranslationsMenuItem'

export const Navigation = () => (
	<Menu>
		<Menu.Item>
			<Menu.Item title="General" to="general" />
			<TranslationsMenuItem />
		</Menu.Item>
	</Menu>
)
