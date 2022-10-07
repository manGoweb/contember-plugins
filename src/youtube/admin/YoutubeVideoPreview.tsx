import { Component } from '@contember/admin'

export const YoutubeVideoPreview = Component<{ videoId: string }>(({ videoId }) => (
	<div
		style={{
			aspectRatio: '16 / 9',
			position: 'relative',
		}}
	>
		<iframe
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			}}
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${videoId}`}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	</div>
))
