import React from 'react'
import { useStateLink } from '@hookstate/core'
import { Label, Card, Header, Segment, Image } from 'semantic-ui-react'
import Img from 'react-image'
import streamers from '../services/cmd_streamers'
import commands from '../commands'
import tools from '../tools'

export default function Lobby() {
	const streamersLink = useStateLink(streamers.ref)

	const isMobileFormFactor = () => {
		return window.screen.availWidth < 400
	}

	const Streamer = (prop) => {
		const streamer = prop.streamer

		const previewURL = (user) => {
			var pictureURL = '/i/preview.jpg'
			switch (user.service) {
				case 'twitch':
					const lowerName = user.name.toLowerCase()
					pictureURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${lowerName}-320x180.jpg`
					break
				case 'youtube':
					pictureURL = `/youtube-preview/${user.id}`
					break
			}
			return [pictureURL, '/i/preview.jpg']
		}

		return (
			<Card>
				<Image wrapped ui={false} onClick={() => commands.joinGame(streamer.user)} style={{ cursor: 'pointer' }}>
					<Img src={previewURL(streamer.user)} loader={<img src="/i/preview.jpg" />} />
				</Image>
				<Card.Content>
					<Image floated="right" size="mini" src={streamer.user.picture} circular />
					<Card.Header>
						{streamer.user.service == 'twitch' ? (
							<a href={`https://twitch.tv/${streamer.user.name}`} target="_blank" style={{ textDecoration: 'underline' }}>
								{streamer.user.name}
							</a>
						) : (
							streamer.user.name
						)}
					</Card.Header>
					<Card.Meta>Online since {tools.ago(streamer.info.started)}</Card.Meta>
					<Card.Description>
						<b>{streamer.info.title || 'Untitled'}</b>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Label size="mini">{streamer.viewers} viewers</Label>
					{streamer.info.matureOnly && (
						<Label floated="right" size="mini" color="red">
							Mature Chanell
						</Label>
					)}
				</Card.Content>
			</Card>
		)
	}

	return (
		<React.Fragment>
			<Header style={{ color: 'white', fontWeight: '700' }}>Available Games</Header>
			<Segment basic>
				<Card.Group itemsPerRow={isMobileFormFactor() ? 1 : 2} style={{ margin: '-2em', marginTop: '-1em' }}>
					{streamersLink.value.map((streamer) => (
						<Streamer key={`${streamer.user.id}:${streamer.user.service}`} streamer={streamer} />
					))}
				</Card.Group>
			</Segment>
		</React.Fragment>
	)
}
