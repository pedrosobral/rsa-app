import { RoomsProvider } from './rooms';
import { FeathersProvider } from './feathers';

let rooms;

describe('Provider: Rooms', () => {

  beforeEach(() => {
    const app = new FeathersProvider();
    rooms = new RoomsProvider(app);
  });

  it ('should create a rooms service', () => {
    console.info('rooms', rooms);
    expect(rooms).toBeDefined();
  });
});
