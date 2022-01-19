import { Component, Environment, useEnvironment } from '@contember/admin'
import * as React from 'react'

export const GetEnv = Component<{ render: (env: Environment) => React.ReactNode | null }>(props => {
	const env = useEnvironment()
	return <>{props.render(env)}</>
})
