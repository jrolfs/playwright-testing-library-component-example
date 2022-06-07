import * as TestingLibraryDom from '@testing-library/dom';

/**
 * Copy pasta'ed from `playwright-testing-library`
 *
 * @see {@link https://github.com/jrolfs/playwright-testing-library-component-example/blob/43d8d56db9cdc6606e8ddd9a0b3cf18daf4f12b6/playwright/index.ts#L3-L8}
 */
const reviver = (_: string, value: string) => {
  if (value.toString().includes('__REGEXP ')) {
    const match = /\/(.*)\/(.*)?/.exec(value.split('__REGEXP ')[1]);

    return new RegExp(match![1], match![2] || '');
  }

  return value;
};

/**
 * Work around issue with Playwright Testing Library + Experimental Component
 * support in Playwright Test by loading the global JavaScript we need here.
 *
 * @see {@link https://github.com/testing-library/playwright-testing-library/blob/19c9ebd37917ec04eedf02e6dbe8d55b45f0855b/lib/fixture/locator.ts#L120-L124}
 */
const attachTestingLibrary = () => {
  window.TestingLibraryDom = TestingLibraryDom;
  window.__testingLibraryReviver = reviver;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachTestingLibrary);
} else {
  attachTestingLibrary();
}
