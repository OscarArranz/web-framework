import { User } from './models/User';

const user = new User({
  name: 'John',
  age: 65,
});

user.on('change', () => console.log('User properties changed!'));

user.set({
  name: 'Ron',
});
