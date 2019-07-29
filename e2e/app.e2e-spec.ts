import {Page} from './app.po';
import { browser, by, element } from 'protractor';

describe('App', () => {
	let page: Page;

	beforeEach(() => {
		page = new Page();
	});

	describe('default screen', () => {
		beforeEach(() => {
			page.navigateTo('/');
		});

		it('should have a title saying AVIATION WEATHER', () => {
			browser.ignoreSynchronization = true;
			page.getHomeTitleText().then(title => {
				expect(title).toEqual('AVIATION WEATHER');
			});
			browser.ignoreSynchronization = false;
		});
	})
});
