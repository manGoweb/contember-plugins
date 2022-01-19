import {
	EntityAccessor,
	useEntity,
	useMutationState,
	Button,
	ButtonOwnProps,
	ButtonProps,
	Icon,
	usePersistWithFeedback,
	useDialog,
	ButtonList,
} from '@contember/admin'
import { memo, ReactNode, useCallback } from 'react'

export type DeleteEntityButtonProps = ButtonProps & {
	immediatePersist?: true
	children?: ReactNode
	confirmationMessage?: ReactNode
}

export const DeleteEntityButton = memo((props: DeleteEntityButtonProps) => {
	const { children, immediatePersist, ...rest } = props
	const parentEntity = useEntity()
	const triggerPersist = usePersistWithFeedback()
	const isMutating = useMutationState()
	const { openDialog } = useDialog()
	const onClick = useCallback(async () => {
		setTimeout(async () => {
			if (props.immediatePersist) {
				let success: boolean
				try {
					await openDialog({
						content: ({ resolve, reject }) => {
							return (
								<>
									<p style={{ maxWidth: '30em', marginTop: '0' }}>{props.confirmationMessage ?? 'Are you sure?'}</p>
									<ButtonList>
										<Button intent="primary" onClick={() => resolve(undefined)}>
											Delete
										</Button>
										<Button onClick={() => reject()}>Cancel</Button>
									</ButtonList>
								</>
							)
						},
					})
					success = true
				} catch (e) {
					console.log(e)
					success = false
				}

				if (!success) {
					return
				}
			}
			parentEntity.deleteEntity()

			if (props.immediatePersist && triggerPersist) {
				triggerPersist().catch(() => {})
			}
		}, 100)
	}, [triggerPersist, openDialog, props.immediatePersist, parentEntity, props.confirmationMessage])

	if (!(parentEntity instanceof EntityAccessor)) {
		return null
	}

	let defaultProps: ButtonOwnProps = {
		size: 'small',
		flow: 'squarish',
		distinction: 'seamless',
		bland: true,
	}

	return (
		<Button {...defaultProps} {...rest} disabled={isMutating || rest.disabled} onClick={onClick}>
			{children || <Icon blueprintIcon="trash" />}
		</Button>
	)
})
DeleteEntityButton.displayName = 'DeleteEntityButton'
