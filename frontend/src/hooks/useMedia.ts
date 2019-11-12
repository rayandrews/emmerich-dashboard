import { useMediaQuery } from 'react-responsive';

export enum MediaBootstrapQuery {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export const useMediaBootstrap = () => {
  const isXs = useMediaQuery({
    maxDeviceWidth: 575,
  });

  const isSm = useMediaQuery({
    minDeviceWidth: 575,
    maxDeviceWidth: 767,
  });

  const isMd = useMediaQuery({
    minDeviceWidth: 768,
    maxDeviceWidth: 991,
  });

  const isLg = useMediaQuery({
    minDeviceWidth: 991,
    maxDeviceWidth: 1199,
  });

  const isXl = useMediaQuery({
    minDeviceWidth: 1200,
  });

  if (isXs) return MediaBootstrapQuery.XS;
  else if (isSm) return MediaBootstrapQuery.SM;
  else if (isMd) return MediaBootstrapQuery.MD;
  else if (isLg) return MediaBootstrapQuery.LG;
  else if (isXl) return MediaBootstrapQuery.XL;
  else return MediaBootstrapQuery.XS;
};

export const useMediaDevice = () => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isRetina = useMediaQuery({ minResolution: '2dppx' });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isTabletOrMobileDevice,
    isPortrait,
    isRetina,
  };
};
