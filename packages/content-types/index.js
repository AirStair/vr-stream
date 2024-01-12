const contentTypes = {
    js: 'text/javascript',
    html: 'text/html',
    mp4: 'video/mp4'
};

export const getContentType = (file) => {
    const regexp = /\.(?<type>\w{2,4})$/;
    const data = regexp.exec(file);
    const groups = data?.groups;
    const type = groups?.type;
    return contentTypes?.[type];
};