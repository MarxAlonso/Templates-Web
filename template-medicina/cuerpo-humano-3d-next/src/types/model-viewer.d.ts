import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        exposure?: string;
        'environment-image'?: string;
        'auto-rotate-delay'?: string;
        'interaction-prompt'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        'auto-rotate'?: boolean;
      };
    }
  }
}
