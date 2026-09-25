import { toPng } from 'html-to-image';

/**
 * Download a DOM element as a high-resolution PNG image
 */
export async function downloadElementAsPng(
  element: HTMLElement,
  filename: string,
  pixelRatio = 2.5
): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: '#FFFFFF',
      filter: (domNode: HTMLElement) => {
        // Exclude interactive overlay buttons if any
        return !domNode.classList?.contains('no-export');
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export card image:', error);
    return false;
  }
}

/**
 * Trigger native print dialog for the ID Card
 */
export function printIdCard(): void {
  window.print();
}
