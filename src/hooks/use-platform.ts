import React from 'react';

export function usePlatform(
  platformOptions: window.H.service.Platform.Options,
  scriptsLoaded = true,
) {
  const [platform, setPlatform] = React.useState<
    H.service.Platform | undefined
  >(undefined);

  React.useEffect(() => {
    if (!platform && scriptsLoaded) {
      setPlatform(new window.H.service.Platform(platformOptions));
    }
  }, [platform, platformOptions, scriptsLoaded]);

  return platform;
}
