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
	const ChangePasswordPage = (
		<GenericPage pageName="tenantChangePassword" key="tenantChangePassword">
			<ChangePassword />
		</GenericPage>
	)

	// query is required, so send a dummy query
	const UsersManagementPage = (
		<GenericPage pageName="tenantUsers" key="tenantUsers">
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

	const InviteUserPage = (
		<GenericPage pageName="tenantInviteUser" key="tenantInviteUser">
			<InviteUserToProject rolesConfig={rolesConfig} />
		</GenericPage>
	)

	const EditUserPage = (
		<Page name="tenantEditUser">
			{({ id }: { id: string }) => <EditUserInProject rolesConfig={rolesConfig} identityId={id} />}
		</Page>
	)

	return {
		ChangePasswordPage,
		UsersManagementPage,
		InviteUserPage,
		EditUserPage,
	}
}
