import { JBHFrontPage } from './app.po';

describe('jbhfront App', () => {
  let page: JBHFrontPage;

  beforeEach(() => {
    page = new JBHFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
