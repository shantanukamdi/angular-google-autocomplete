import { AngularPlacesAutocompleteAppPage } from './app.po';

describe('angular-places-autocomplete-app App', () => {
  let page: AngularPlacesAutocompleteAppPage;

  beforeEach(() => {
    page = new AngularPlacesAutocompleteAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
