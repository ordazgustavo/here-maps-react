import React from 'react';

export function usePlatform(platformOptions: H.service.Platform.Options) {
  const [platform, setPlatform] = React.useState<H.service.Platform | null>(
    null,
  );

  React.useEffect(() => {
    if (!platform) {
      setPlatform(new H.service.Platform(platformOptions));
    }
  }, [platform, platformOptions]);

  return platform;
}
