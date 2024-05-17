import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // Scroll to top if pathname changes or is the same as previous
    if (pathname !== prevPathname || pathname === prevPathname) {
      window.scrollTo(0, 0);
      setPrevPathname(pathname);
    }
  });

  return null;
};

export default ScrollToTop;
