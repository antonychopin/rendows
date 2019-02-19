import { observable } from "mobx"

import ReFSPartition from "./FSPartition"
import ReFSFolder from "./FSFolder"

export default class ReFSEntity {
	partition: ReFSPartition
	parent: ReFSFolder = null
	
	@observable name: string
	type: string

	constructor(partition: ReFSPartition, parent?: ReFSFolder) {
		this.partition = partition
		this.parent = parent || null
	}
}