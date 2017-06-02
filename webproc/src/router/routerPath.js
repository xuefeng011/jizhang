export const ROOT = {
	getPath(){
		return '/'
	}
}

export const APP = {
	parent: ROOT,
	getPath() {
		return  `${this.parent.getPath()}APP`
	}
} 

export const APP_HOME = {
	parent: APP,
	getPath() {
		return  `${this.parent.getPath()}/HOME`
	}
} 

export const APP_SHARE = {
	parent: APP,
	getPath() {
		return  `${this.parent.getPath()}/SHARE`
	}
} 

export const APP_BONUS = {
	parent: APP,
	getPath() {
		return  `${this.parent.getPath()}/BONUS`
	}
}


export const WX = {
	parent: ROOT,
	getPath() {
		return  `${this.parent.getPath()}WX`
	}
} 

export const WX_HOME = {
	parent: WX,
	getPath() {
		return  `${this.parent.getPath()}/HOME`
	}
} 

export const WX_BONUS = {
	parent: WX,
	getPath() {
		return  `${this.parent.getPath()}/BONUS`
	}
}  