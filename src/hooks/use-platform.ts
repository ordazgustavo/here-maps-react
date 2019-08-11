import React from 'react';

export function usePlatform(
  platformOptions: H.service.Platform.Options,
  scriptsLoaded = true,
) {
  const [platform, setPlatform] = React.useState<H.service.Platform>();

  React.useEffect(() => {
    if (!platform && scriptsLoaded) {
      setPlatform(new H.service.Platform(platformOptions));
    }
  }, [platform, platformOptions, scriptsLoaded]);

  return platform;
}
