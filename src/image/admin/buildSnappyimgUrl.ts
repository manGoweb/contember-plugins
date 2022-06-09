import Snappyimg from 'snappyimg'

const snappyimg = new Snappyimg('i27kxs55bq0k', '336c7a61727a7a73373634317671', Snappyimg.Stage.Serve)

export function buildSnappyimgUrl(originalUrl: string, options?: Partial<Snappyimg.Options>) {
	if (originalUrl.startsWith('http://localhost')) {
		return originalUrl
	}

	return snappyimg.buildUrl(encodeURI(originalUrl), options)
}
