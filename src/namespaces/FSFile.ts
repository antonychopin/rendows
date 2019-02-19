import ReFSEntity from "./FSEntity"
import ReFSPartition from "./FSPartition"
import ReFSFolder from "./FSFolder"

import { ReFile } from "types/Filesystem"

export default class ReFSFile extends ReFSEntity {
	ext: string
	size: number

	constructor(partition: ReFSPartition, parent: ReFSFolder, rawFile: ReFile) {
		super(partition, parent)
		this.name = rawFile.name
		this.type = rawFile.type
		this.ext = rawFile.ext
		this.size = rawFile.size
	}
}