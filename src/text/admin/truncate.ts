export const truncate = (text: string, maxLength = 40) => {
	if (text.length <= maxLength) {
		return text
	}
	const words = text.split(' ')

	// Try to always show at least first two words
	const firstTwoWords = words.slice(0, 2).join(' ')
	if (firstTwoWords.length > maxLength) {
		return text.substring(0, maxLength) + '…'
	}

	let output = words[0]

	for (const word of words.slice(1)) {
		const newOutput = `${output} ${word}`
		if (newOutput.length > maxLength) {
			output += ' …'
			break
		}
		output = newOutput
	}

	return output
}

// You can experiment here https://www.typescriptlang.org/play?#code/PQKgpgHgDg9gTgFxMABAYxgOwM4JQuAV0zQEMEwUBeFACgogQC4Vc4BLTAcwBoUBbUhAAyYbggAW1FABYADAEpqAPhQBvAFABIdgDM6DBADoANmK6SUAHhqCR5yUs1atcMAkJxM+SAm0BfbQwcPAB3eAATbGlDI2woE3YEWgByFBSFDQ0UHJRgVAAVOABPfBgUUhNQ0mLo7AkYUIqEM1JcFF12OHaEcJRwuCjs3OD2zu6EAvCAdUjomgGouMS0MFo5PgAmBSMAKxhOVPTM3JQ9OnHcKZhZwexTBylVO1FxCSdh05y3Dy8fRjihAARmxOFx1nwXo8lABqdKAMgIUp8UIFtGY8DBCAgoFjpItsABtOQAXSyp108DoozCkRQMH0+OW7FWtAAjAoPl8Rlh2pgwKEAPJYnF4GgAAwAJGpMdisf4UFLFv4xcjTudaHzBcKsQ83ihnkJXhZ3upVVy6dq8DCaGlEWauUC3KQANb2lFumUi6SaoWyvynVGudyebyerEaVHUny4eYoAnIlIpHgJgCyAFvAIaApBQAC13PAkwmAEpgACOhDA7WzETA-HKUFIXDAhdOKQAwm1KABlDwRdiVlA1hCkdgmOiwHrFKCUBtNhQt3IpAAilfYXG8PcIfZgC5y7YAXmA0FIu4R+IISv0klJcKREIQoAJyKQIpSAGowXbDlBFmCAWEAwGdXd0gAOSwABaKA4HpJI6TgLhSEwdh93IdgeWAlI+V2fcawAN0AbEBhzwl9KwAQ4oaDMFI7AYCBJIwBMTB8N2DM0waDC5FZTYAGYZAAVgANgAdgADgATk4nj+OE8TJN4wTRIkrj5JksSOOU6TFLkzTZI0hTdKk-SlMM1SMIABT5M8sExEwCFIfhmWg7AMCgZlsFHZkYFwmATDITAYGCND3OwDDhHgWsUAASSgbAzzOOp2H4BJSgiM9+FKQw6X0SQZw4TAEDBCpMAifAp0rdwCu4M5isINhiiMFAwrcfgopiuKJDaFAgTAMR8AkShOFSuqAB0UjqYdirvErUvPDLfBQMBcLAOBWE4VY+soVk+LkORsD4UJ+u8RCUGIZ1-NCbwoM4CiyhgZ0KhQBCTDMUp6VK6cipK5y4HsoEzBK2CEHKQRnUobMEDK1hpzQRLeqBGA7oayK8A6upPFw9glpK-yMUwExSk6Jb0DEX5+z2rrcUqGiNpQVpH2u8oGKPAgsGZd7yoQSreBQZqRyQqrK2wEn2EqfGTpIDruDACIkbCTrYBxEw73YIWAe8HKUFZMSBN2q9LA1txWiFrLGvcH6hbweoeoQaJgmHThCqaiLotilqG2wbBG0rPhEJKus3B5o8SbF0Jr0HStnSBx8cT+lWJEKmjdF6O9KESUGUAAQRMIaUDMr2UxdZbqrQEwt0KpbujQnATadlqXbPIxQvCuu2pa9hVqSsWZvS-4MWy-qUCu-LCt99mLa56qhoIerGub1rXZQVGup69WB8G2rp9G8bfamwc0rmxgFor1aSEoDWtp28mDt647TvOy68puoG7oep6XpNiGPtH77fv+s48CBk+dO4NIbxCPLDbw8NEZRRRp1WKcAMZYxQDjOkeMCaY0oKsfKngyZ8CBJTEw1MNZ02qoApmaAWZITQGPCqYI+C8wdgLD2wtRalGIMeRCTYZYwP6PLGAitlaq2qjTLWOtoih31gPQ2YBOw1zNp2S2-V3C2ywPbfmXBZ7NXnnFd2nsmzk1Hv7SgbgsEtFKBIqQNZsCR34YPYEiR6gJ3pMnAOadKBZxznnJsBdQYrTWqXPsVUK7uR5DXOe9d+CN2TKSDQowfJgCMCXGRcBaCZAoDGIwFI4AAFFSDHloPQSsCAlBUFUJoU4cSzCmBgOCAg7DyBrHScUlAcIxQoAAD6dLoFKJp-gFBikyH0oAA