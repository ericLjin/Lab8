/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';
 import { router } from '../scripts/router.js';

describe('pushToHistoryTest', () => {
    test('push settings', () => {
        let historyObj = pushToHistory('settings');
        expect(historyObj.length).toBe(2);
        window.addEventListener('popstate', function(e){
            expect(e.state).toBe("settings");
        });
    });

    test('push entry', () => {
        pushToHistory('entry', 4);
        pushToHistory('entry', 1);
        let historyObj = pushToHistory('entry', 32);
        expect(historyObj.length).toBe(5); //because we pushed 2 before
        window.addEventListener('popstate', function(e){
            expect(e.state).toBe("entry32");
        });
    });

    test('push default', () => {
        pushToHistory('something else', 1);
        pushToHistory('error');
        pushToHistory('');
        let historyObj = pushToHistory('', 2);
        expect(historyObj.length).toBe(9);
        window.addEventListener('popstate', function(e){
            expect(e.state).toBe({});
        });

    });
})
