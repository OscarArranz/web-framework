import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:#set-random-age': this.setRandomAge,
      'click:#set-name': this.setName,
      'click:#save': this.save,
    };
  };

  save = (): void => {
    this.model.save();
  };

  setName = (): void => {
    const name = this.parent.querySelector('input')?.value;

    if (name) this.model.set({ name });
  };

  setRandomAge = (): void => {
    this.model.setRandomAge();
  };

  onButtonClick = (): void => {
    console.log('Hi there');
  };

  onHeaderHover = () => console.log('hoverrr');

  template = (): string => {
    return `
      <div>
        <input placeholder="${this.model.get(
          'name'
        )}" /> <button id="set-name">Change name</button>
        <button id="set-random-age">Set random age</button>
        <button id="save">Save</button>
      </div>
    `;
  };
}
