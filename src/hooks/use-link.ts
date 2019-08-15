import React from 'react';

const loadedLinks: Map<string, string> = new Map();

export function useLink(url: string, name: string) {
  const [state, setState] = React.useState({
    loaded: false,
    error: false,
  });

  React.useEffect(() => {
    if (loadedLinks.get(name)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      loadedLinks.set(name, url);

      const link = document.createElement('link');
      const body = document.getElementsByTagName('body')[0];

      link.href = url;
      link.rel = 'stylesheet';
      link.type = 'text/css';

      const onLinkLoad = () => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onLinkError = () => {
        const exist = loadedLinks.get(name);
        if (exist) {
          loadedLinks.delete(name);
        }
        link.remove();

        setState({
          loaded: true,
          error: true,
        });
      };

      link.addEventListener('load', onLinkLoad);
      link.addEventListener('error', onLinkError);

      body.appendChild(link);

      return () => {
        link.removeEventListener('load', onLinkLoad);
        link.removeEventListener('error', onLinkError);
      };
    }
  }, [name, url]);

  return [state.loaded, state.error];
}
