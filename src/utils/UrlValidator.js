export const urlValidator = async (originalUrl) => {
    try {
        const url = new URL(originalUrl);
        return url.protocol === 'http: ' || url.protocol === 'https: '
    } catch (error) {
        return false
    }
};