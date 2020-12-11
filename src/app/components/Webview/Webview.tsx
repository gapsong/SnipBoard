import React from 'react';

type WebviewProps = {
    id: string;
    url: string;
};

const Webview: React.FunctionComponent<WebviewProps> = ({ id, url }) => {
    return <webview id={id} style={{ width: '100%', height: '100%', minHeight: '100px' }} src={url} preload='./preload.js' />;
};

export { Webview };
