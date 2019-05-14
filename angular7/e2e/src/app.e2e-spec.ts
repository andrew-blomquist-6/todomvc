import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
<<<<<<< HEAD:angular7-ngrx/e2e/src/app.e2e-spec.ts
    expect(page.getTitleText()).toEqual('Welcome to angular7-ngrx!');
=======
    expect(page.getTitleText()).toEqual('Welcome to angular7!');
>>>>>>> master:angular7/e2e/src/app.e2e-spec.ts
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
