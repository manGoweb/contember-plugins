import { Component, useEnvironment } from '@contember/admin'
import { ReactNode } from 'react'

export const WaitForDimensions = Component<{ dim: string[]; children: ReactNode }>(props => {
	const environment = useEnvironment()

	for (const dimension of props.dim) {
		if (!environment.hasDimension(dimension)) {
			return <></>
		}
	}

	return <>{props.children}</>
})
