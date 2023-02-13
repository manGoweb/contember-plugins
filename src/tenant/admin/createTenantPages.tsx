import {
	ChangePassword,
	EditUserInProject,
	GenericPage,
	InviteUserToProject,
	Page,
	RolesConfig,
	UsersManagement,
} from '@contember/admin'

export const createTenantPages = (
	rolesConfig: RolesConfig = {
		admin: {
			name: 'Administrator',
			variables: {},
		},
	},
) => {
	const tenantChangePassword = (
		<GenericPage>
			<ChangePassword />
		</GenericPage>
	)

	// query is required, so send a dummy query
	const tenantUsers = (
		<GenericPage>
			<UsersManagement
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
			/>
		</GenericPage>
	)

	const tenantInviteUser = (
		<GenericPage>
			<InviteUserToProject rolesConfig={rolesConfig} />
		</GenericPage>
	)

	const tenantEditUser = (
		<Page name="tenantEditUser">
			{({ id }: { id: string }) => <EditUserInProject rolesConfig={rolesConfig} identityId={id} />}
		</Page>
	)

	return {
		tenantChangePassword,
		tenantUsers,
		tenantInviteUser,
		tenantEditUser,
	}
}
