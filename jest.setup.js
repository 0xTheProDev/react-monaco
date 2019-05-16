import { JSDOM } from 'jsdom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/** Configure JSDOM */
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

/** JSDOM APIs in global scope */
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);

/** Additional Browser API */
Object.defineProperty(document, 'queryCommandSupported', {
  value: () => false,
});

/** React 16 Enzyme adapter */
Enzyme.configure({ adapter: new Adapter() });

/** Utility function to copy properties from JSDOM to global */
function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}
