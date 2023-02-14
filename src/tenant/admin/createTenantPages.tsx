import {
	ChangePassword,
	EditUserPage,
	GenericPage,
	InviteUserPage,
	RolesConfig,
	useCurrentRequest,
	UserListPage,
} from '@contember/admin'
import { FunctionComponent } from 'react'

export const createTenantPages = (
	rolesConfig: RolesConfig = {
		admin: {
			name: 'Administrator',
			variables: {},
		},
	},
) => {
	const changePassword = (
		<GenericPage>
			<ChangePassword />
		</GenericPage>
	)

	// query is required, so send a dummy query
	const users = (
		<UserListPage
			rolesDataQuery={`
query {
	_info {
		description
	}
}
					`}
			roleRenderers={{
				admin: () => <>Administrator</>,
			}}
			addUserLink="tenant/invite"
			editUserLink="tenant/edit(id: $identityId)"
		/>
	)

	const invite = <InviteUserPage rolesConfig={rolesConfig} userListLink="tenant/users" />

	const Edit: FunctionComponent = () => {
		const id = useCurrentRequest()?.parameters.id
		if (typeof id !== 'string') {
			throw new Error('Missing identity id.')
		}
		return <EditUserPage identityId={id} rolesConfig={rolesConfig} userListLink="tenant/users" />
	}

	const edit = <Edit />

	return {
		changePassword,
		users,
		invite,
		edit,
	}
}
