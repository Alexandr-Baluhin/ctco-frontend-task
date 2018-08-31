/// <reference path="declarations.d.ts" />

import 'polyfills';
import 'vendor';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, hmrModule } from '@angularclass/hmr';

import { AppModule } from './app/app.module';

// Add this there because of angular issue
// "Cannot enable prod mode after platform setup."
if (ENV === 'production') {
  enableProdMode();
}

// Main bootstrap function
export function main() {
  let bootstrapedModule = platformBrowserDynamic().bootstrapModule(AppModule);

  if (ENV === 'production') {
    return bootstrapedModule;
  } else {
    return bootstrapedModule.then((ngModuleRef: any) => {
      // `module` global ref for webpackhmr
      // Don't run this in Prod
      return hmrModule(ngModuleRef, module);
    }).catch(err => console.error(err));
  }
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    // boot on document ready
    ENV === 'production' ? main() : bootloader(main);
}

// boot then document is ready
function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  ENV === 'production' ? main() : bootloader(main);
}
