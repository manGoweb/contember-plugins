import { createTenantPages } from '../../src/tenant/admin/createTenantPages'

const pages = createTenantPages()

export const edit = pages.edit
export const invite = pages.invite
export const users = pages.users
export const changePassword = pages.changePassword
