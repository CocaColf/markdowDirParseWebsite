import * as PATH from 'path';
import { copyDir } from '../common/copyDir';

let srcPath = process.cwd();

export let dstPath = PATH.join(PATH.dirname(srcPath), 'dist');

export let copyDirHandler = () => {
    copyDir(srcPath, dstPath)
};
