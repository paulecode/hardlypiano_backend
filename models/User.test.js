const User = require('./User');

describe('model User is defined and functional', () => {
	it('model User is defined', () => {
		expect(User).toBeDefined();
	});
	it('model User accepts username and password', () => {
		const user = new User({
			username: 'foo',
			password: 'bar',
		});
		expect(user.username).toBeDefined();
		expect(user.password).toBeDefined();
	});
	it('model User requires username and password', () => {
		const user = new User({ username: 'foo' });
		expect(user.save).toThrow();
	});
	it('model User is initialized with pieces array', () => {
		const user = new User({ username: 'foo', password: 'bar' });
		expect(user.pieces).toBeInstanceOf(Array);
	});
});
