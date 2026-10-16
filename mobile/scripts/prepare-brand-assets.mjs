import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { generateImageAsync, generateImageBackgroundAsync, compositeImagesAsync } from '@expo/image-utils';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const { source } = await generateImageAsync(
    { projectRoot, cacheType: 'uau-brand-icon-640' },
    {
        src: fileURLToPath(new URL('../assets/uau-logo.jpg', import.meta.url)),
        width: 640,
        height: 640,
        resizeMode: 'contain',
        backgroundColor: '#003C2F',
        name: 'uau-logo-contained-640.png',
    },
);
const background = await generateImageBackgroundAsync({
    width: 1024, height: 1024, resizeMode: 'contain', backgroundColor: '#003C2F',
});
const icon = await compositeImagesAsync({ foreground: source, background, x: 192, y: 192 });
await writeFile(new URL('../assets/uau-icon.png', import.meta.url), icon);
console.log('Ícone U.A.U preparado com a imagem completa.');
