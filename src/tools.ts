import routesRef from './hooks/routes'
import { v4 as uuidv4 } from 'uuid'
import { BSON } from 'bsonfy'

const version = 'v0.1.0'

let _firstTime = true
const firstTime = () => {
	const f = _firstTime
	_firstTime = false
	return f
}

const send = (ws, type, obj) => {
	if (type != 'ping') console.log(`<-- ${type.toUpperCase()} ${Object.keys(obj).join(' ')}`)
	ws.send(BSON.serialize({ ...obj, type }))
}

const uuid = () => uuidv4()

const ago = (n) => {
	var sec = Math.floor((Date.now() - n) / 1000)
	var min = 0
	var hrs = 0
	if (sec <= 0) return 'just now'
	if (sec >= 60) {
		min = Math.floor(sec / 60)
		if (min >= 60) {
			hrs = Math.floor(min / 60)
			if (hrs > 0) sec -= 3600 * hrs
			min -= hrs * 60
		}
		sec -= min * 60
	}
	return `${hrs > 0 ? hrs + 'h ' : ''}${min > 0 ? min + 'm ' : ''}${sec}s ago`
}

const sleep = async (sec) => {
	return new Promise((resolve, _reject) => {
		setTimeout(() => resolve(), sec * 1000)
	})
}

const goto = (page) => routesRef.nested.current.set(page)

const dataURL = (image, type = 'jpeg') => {
	const blob = new Blob([image], { type: `image/${type}` })
	return URL.createObjectURL(blob)
}

const boxValue = (n, min, max) => {
	return Math.min(max, Math.max(min, n))
}

const defaultAvatar =
	'data:image/gif;base64,R0lGODlhGAAYAKIAAN3d3aqqqoiIiJmZmbu7u8zMzHd3dwAAACH5BAAAAAAALAAAAAAYABgAAANVCLrc/jDKSau9sYQdCgZcGFxiSFhlWGnp5k1Eu50T276SneKSPFaxFK0yKA0wgyIniTQkBwLnhSCIGq7VISQGrXq/RQJPQf2az9rFee2NsM+Ut+CRAAA7'

export default {
	version,
	firstTime,
	send,
	uuid,
	ago,
	sleep,
	goto,
	dataURL,
	boxValue,
	defaultAvatar,
}
