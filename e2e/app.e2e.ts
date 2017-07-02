import { Page } from './pages/pages';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a title saying Page One', () => {
      page.getTitle().then(title => {
        expect(title).toEqual('Resposta em Sala de Aula');
      });
    });
  })
});
