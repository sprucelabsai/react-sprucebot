export default function loggerMiddleware() {
	return ({ getState }) => {
		const { config } = getState()
		return next => action => {
			next(action)
		}
	}
}
