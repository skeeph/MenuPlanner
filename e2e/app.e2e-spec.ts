import { FoodPage } from './app.po';

describe('food App', () => {
  let page: FoodPage;

  beforeEach(() => {
    page = new FoodPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
