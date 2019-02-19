import ReFSEntity from "./FSEntity"
import ReFSPartition from "./FSPartition"
import ReFSFile from "./FSFile"

import { ReFolder, ReFile } from "types/Filesystem"

export default class ReFSFolder extends ReFSEntity {
	children: Array<ReFSFolder | ReFSFile>

	constructor(partition: ReFSPartition, parent: ReFSFolder, rawFolder: ReFolder) {
		super(partition, parent)
		this.type = "folder"
		this.name = rawFolder.name
		this.children = rawFolder.children
			? rawFolder.children.map(child => {
				return child.type == "folder"
					? new ReFSFolder(partition, this, child as ReFolder)
					: new ReFSFile(partition, this, child as ReFile)
			})
			: []
	}
}