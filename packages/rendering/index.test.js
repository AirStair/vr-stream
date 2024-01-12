import { resolve } from '@my-vision/utils';
import { strictEqual } from 'node:assert';
import { rendering } from './index.js';
import { test } from 'node:test';

test('rendering', async () => {
    const meta = import.meta;
    const file = resolve(meta, './test-file.js');
    const template = rendering({
        respond: arg => {
            const contentType = arg['content-type'];
            strictEqual(contentType, 'text/javascript');
        },
        end: arg => {
            strictEqual(arg, '//test')
        }
    });
    await template(file);
});
