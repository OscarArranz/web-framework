import { Model } from './Model';
import { Eventing } from './Eventing';
import { APISync } from './APISync';
import { Attributes } from './Attributes';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootURL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static build(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new APISync<UserProps>(rootURL)
    );
  }

  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootURL, (props: UserProps) =>
      User.build(props)
    );
  }

  setRandomAge = (): void => {
    const age = Math.floor(Math.random() * 100);

    this.set({ age });
  };
}
