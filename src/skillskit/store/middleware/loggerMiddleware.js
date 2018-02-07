export default function loggerMiddleware() {
	return ({ getState }) => {
		const { config } = getState()
		return next => action => {
			if (config.DEV_MODE) {
				const { type, types, ...rest } = action
				console.log(`Action ${type || types}`, rest)
			}
			next(action)
		}
	}
}
