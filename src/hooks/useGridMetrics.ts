import { useEffect, useState } from 'react';

export interface GridMetrics {
  blockSize: number;
  columns: number;
  rowsPerViewport: number;
  maxWidth: number;
}

export function useGridMetrics() {
  const [metrics, setMetrics] = useState<GridMetrics>({
    blockSize: 54,
    columns: 16,
    rowsPerViewport: 12,
    maxWidth: 1400,
  });

  useEffect(() => {
    const updateMetrics = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Base target block size ~ 54px-60px
      const targetBlockSize = vw < 640 ? 44 : vw < 1024 ? 50 : 54;
      const rows = Math.max(10, Math.floor(vh / targetBlockSize));
      const evenRows = rows % 2 === 0 ? rows : rows + 1;
      const computedBlockSize = Math.round(vh / evenRows);

      const computedCols = Math.max(6, Math.floor(vw / computedBlockSize));
      const sectionCols = vw < 640 ? 6 : vw < 1024 ? 12 : Math.min(computedCols, 20);
      const maxWidth = sectionCols * computedBlockSize;

      document.documentElement.style.setProperty('--grid-block-size', `${computedBlockSize}px`);
      document.documentElement.style.setProperty('--header-height', `${computedBlockSize}px`);
      document.documentElement.style.setProperty('--grid-section-columns', String(sectionCols));
      document.documentElement.style.setProperty('--grid-max-width', `${maxWidth}px`);

      setMetrics({
        blockSize: computedBlockSize,
        columns: sectionCols,
        rowsPerViewport: evenRows,
        maxWidth,
      });
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

  return metrics;
}
