import { resolve } from '@vr-stream/utils';
import { strictEqual } from 'node:assert';
import { test, mock } from 'node:test';
import { streaming } from './index.js';

test('rendering', async () => {
    const file = resolve(import.meta, './test-file.js');
    const readStream = streaming({
        respond: arg => {
            strictEqual(arg, {
                ':status': 206,
                'accept-ranges': 'bytes',
                'content-type': 'text/javascript',
                'content-length': 6,
                'content-range': `bytes ${start}-${end}/${size}`,
            });
        },
    }, { range: 1 });
    await readStream(file);
});
