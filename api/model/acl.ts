import { AclDefinition as acl } from '@contember/schema-definition'

export const adminRole = acl.createRole('admin', {
	s3: {
		'**': {
			upload: true,
			read: true,
		},
	},
})
