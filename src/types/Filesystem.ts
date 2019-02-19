export type RePartition = {
	name: string,
	systemName: string,
	children: Array<ReFolder | ReFile>,
	allocatedSpace: number,
	estimateSize: number
}

export type ReFolder = {
	name: string,
	type: "folder",
	children: Array<ReFolder | ReFile>
}

export type ReFile = {
	name: string,
	type: string,
	ext: string,
	size?: number
}