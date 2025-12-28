import packageJson from '../../package.json';

const fallbackVersion = '0.0.0';
const rawVersion = packageJson.version ?? fallbackVersion;
const [major = '0', minor = '0'] = rawVersion.split('.');

export const APP_VERSION_FULL = rawVersion;
export const APP_VERSION_DISPLAY = `${major}.${minor}`;
export const APP_VERSION_TITLE = `v${rawVersion}`;
