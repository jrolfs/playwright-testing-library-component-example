import path from 'path';

import {
  LocatorFixtures as TestingLibraryFixtures,
  locatorFixtures as fixtures,
  within,
} from '@playwright-testing-library/test/fixture';
import { test as baseTest } from '@playwright/experimental-ct-react';

import App from './App';

const test = baseTest.extend<TestingLibraryFixtures>(fixtures);

const { expect } = test;

test.use({ viewport: { width: 500, height: 500 } });

test.describe('experimental component', () => {
  test('selecting element using standard locator', async ({ mount, page }) => {
    const component = await mount(<App />);

    await expect(page.locator('.title')).toContainText(
      'Playwright Testing Library',
    );
    await expect(component.locator('.title')).toContainText(
      'Playwright Testing Library',
    );
  });

  test('selecting element using Playwright Testing Library query', async ({
    mount,
    queries,
  }) => {
    await mount(<App />);

    // Document
    await expect(queries.getAllByRole('heading').first()).toContainText(
      'Header Header',
    );
  });

  test('selecting element using Playwright Testing Library query + `within`', async ({
    mount,
  }) => {
    // This one is a little aggregious with `within`... but I wanted
    // to see if it worked with the `Locator` returned from `mount()`

    const component = await mount(<App />);
    const main = within(component).getByRole('main');

    await expect(
      within(main).getByRole('heading', {
        level: 2,
      }),
    ).toContainText('Experimental Component Support');
  });
});

test.describe('standard page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`file://${path.join(__dirname, '../fixtures/page.html')}`);
  });

  test('selecting element using Playwright Testing Library query', async ({
    queries,
  }) => {
    await expect(queries.getAllByRole('heading').first()).toContainText(
      'Header Header',
    );
  });

  test('selecting element using Playwright Testing Library query + `within`', async ({
    queries,
  }) => {
    await expect(
      within(queries.getByRole('main')).getByRole('heading', {
        level: 1,
      }),
    ).toContainText('Playwright Testing Library');
  });
});
