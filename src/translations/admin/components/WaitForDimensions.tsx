import { Component, useEnvironment } from '@contember/admin'
import { default as React, ReactNode } from 'react'

export const WaitForDimensions = Component<{ dim: string[]; children: ReactNode }>(props => {
	const env = useEnvironment()

	for (const dim of props.dim) {
		if (!env.hasDimension(dim)) {
			return <></>
		}
	}

	return <>{props.children}</>
})
