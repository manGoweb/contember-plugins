import Snappyimg from 'snappyimg'

let snappyimg: null | Snappyimg = null

export function buildSnappyimgUrl(originalUrl: string, options?: Partial<Snappyimg.Options>) {
	if (snappyimg === null) {
		snappyimg = new Snappyimg('i27kxs55bq0k', '336c7a61727a7a73373634317671', Snappyimg.Stage.Serve)
	}
	if (originalUrl.startsWith('http://localhost')) {
		return originalUrl
	}

	return snappyimg.buildUrl(encodeURI(originalUrl), options)
}
