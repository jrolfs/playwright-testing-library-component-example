import * as TestingLibraryDom from '@testing-library/dom';

const reviver = (_: string, value: string) => {
  if (value.toString().includes('__REGEXP ')) {
    const match = /\/(.*)\/(.*)?/.exec(value.split('__REGEXP ')[1]);

    return new RegExp(match![1], match![2] || '');
  }

  return value;
};

const attachTestingLibrary = () => {
  window.TestingLibraryDom = TestingLibraryDom;
  window.__testingLibraryReviver = reviver;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachTestingLibrary);
} else {
  attachTestingLibrary();
}
