import { Box, Collapsible, Heading } from '@contember/admin'
import clsx from 'clsx'
import { FunctionComponent, ReactNode, useState } from 'react'
import styles from './CollapsibleBox.module.sass'

export type CollapsibleBoxProps = {
	heading?: ReactNode
	children?: ReactNode
}

export const CollapsibleBox: FunctionComponent<CollapsibleBoxProps> = ({ heading = 'Collapse', children }) => {
	const [expanded, setExpanded] = useState(false)

	return (
		<Box gap="small" heading={undefined}>
			<button
				type="button"
				className={clsx(styles.button, expanded && styles.is_expanded)}
				onClick={() => setExpanded(!expanded)}
			>
				<Heading depth={6} size="small">
					<div className={styles.header}>
						{heading}
						<div className={styles.caret} />
					</div>
				</Heading>
			</button>
			<Collapsible expanded={expanded}>
				<div className={styles.content}>{children}</div>
			</Collapsible>
		</Box>
	)
}
