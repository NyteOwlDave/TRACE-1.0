
const Project = {
	filenames: [],
	prettify: (filename=>{
		return String(filename).trim().toLowerCase()
	}),
	isRegistered: (filename=>{
		const t = Project.prettify(filename)
		const cmp = (s=>{
			return (s===t)
		})
		return (
			Project.filenames.find(cmp)?true:false
		)
	}),
	register: (filename=>{
		if (Project.isRegistered(filename)) return this
		return (t=>{
			Project.filenames.push(t)
			console.log(`Registered ${t}`)
			return this
		})(Project.prettify(filename))
	}),
	requires: (filename_or_array=>{
		function check(s) {
			if (!Project.isRegistered(s)) {
				throw (
	`A required script file is missing or faulty: ${s}`
				)
			}
			return this
		}
		if (Array.isArray(filename_or_array)) {
			filename_or_array.forEach(s=>{check(s)})
			return this
		}
		return check(filename_or_array)
	}),
	list: (e=>{
		const make = ((tag,text)=>{
			return document.createElement(tag)
		})
		const add = ((p,e)=>{
			p.appendChild(e)
			return p
		})
		const item = ((p,s)=>{
			const li = make('li')
			li.innerText = s
			return add(p,li)
		})
		const ul = make('ul')
		Project.filenames.forEach(s=>{item(ul,s)})
		return (e.appendChild)?add(e,ul):ul
	}),
	describe: (()=>{
		if (speechAvailable) {
			say('The following filenames are registered:')
			Project.filenames.forEach(s=>{say(s)})
		}
	}),
	flag: (value=>{
		const equal = ((e,s)=>{
			const t = e.getAttribute('content')
			return (s===Project.prettify(t))
		})
		const v = Project.prettify(value)
		if (!v) return false
		const flags = document.querySelectorAll(
			'meta[name=flag]'
		)
		if (flags) {
			let found = false
			flags.forEach(flag=>{
				found = found || equal(flag,v)
			})
			return found
		}
		return false
	}),
	removeFlag: (value=>{
		const wipe = (e=>{
			const p = e.parentElement
			p.removeChild(e)
			return e
		})
		const equal = ((e,s)=>{
			const t = e.getAttribute('content')
			return (s===Project.prettify(t))
		})
		const v = Project.prettify(value)
		if (!v) return false
		const flags = document.querySelectorAll(
			'meta[name=flag]'
		)
		if (flags) {
			const found = []
			flags.forEach(flag=>{
				if (equal(flag,v)) {
					found.push(flag)
				}
			})
			if (found.length) {
				found.forEach(meta=>{wipe(meta)})
			}
			return (!Project.flag(v))
		}
		return false
	})
}

Project.register('project.js')

