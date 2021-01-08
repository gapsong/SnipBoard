import React from 'react';

type WebviewProps = {
  id: string;
  url: string;
};

const Webview: React.FunctionComponent<WebviewProps> = ({ id, url }) => {
  // @ts-ignore
  const path = window.api.MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;
  return (
    <webview
      id={id}
      style={{ width: '100%', height: '100%', minHeight: '100px' }}
      src={url}
      preload={`file://${path}/preload.js`}
    />
  );
};

export { Webview };
