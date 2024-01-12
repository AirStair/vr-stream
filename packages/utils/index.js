import { fileURLToPath } from 'node:url';

export const resolve = ({ resolve }, file) => {
    if (!file.startsWith('./')) {
        throw 'not starts with ./';
    }
    const data = resolve(file);
    return fileURLToPath(data);
};