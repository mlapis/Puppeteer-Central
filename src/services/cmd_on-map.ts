import { createStateLink } from '@hookstate/core'
import tools from '../tools'

const initialValue = ''
const ref = createStateLink(initialValue)

const link = (_ws) => {}

const msg = (msg) => {
	if (msg.type == 'on-map') {
		ref.access().set(tools.dataURL(msg.info.image))
	}
}

const remove = (_e) => {}

const reset = () => ref.access().set(initialValue)

export default {
	ref,
	link,
	msg,
	remove,
	reset,
}
