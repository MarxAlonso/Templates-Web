

./src/components/BarraNavegacion/BarraNavegacion.tsx:1:17
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState, useEffect } from 'react';
    |                 ^^^^^^^^
  2 | import Link from 'next/link';
  3 | import { usePathname } from 'next/navigation';
  4 | import styles from './BarraNavegacion.module.css';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx



./src/components/BotonFlotanteFrap/BotonFlotanteFrap.tsx:1:17
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState } from 'react';
    |                 ^^^^^^^^
  2 | import styles from './BotonFlotanteFrap.module.css';
  3 | import { motion, AnimatePresence } from 'framer-motion';
  4 |

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BotonFlotanteFrap/BotonFlotanteFrap.tsx
    ./src/app/layout.tsx



./src/hooks/useAlternarMenu.ts:1:10
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import { useState, useCallback } from 'react';
    |          ^^^^^^^^
  2 |
  3 | export const useAlternarMenu = (estadoInicial: boolean = false) => {
  4 |   const [estaAbierto, setEstaAbierto] = useState(estadoInicial);

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/hooks/useAlternarMenu.ts
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx


 GET / 500 in 8.5s (next.js: 8.2s, application-code: 358ms)
[browser] Uncaught Error: ./src/components/BarraNavegacion/BarraNavegacion.tsx:1:27
You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState, useEffect } from 'react';
    |                           ^^^^^^^^^
  2 | import Link from 'next/link';
  3 | import { usePathname } from 'next/navigation';
  4 | import styles from './BarraNavegacion.module.css';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx


    at <unknown> (Error: ./src/components/BarraNavegacion/BarraNavegacion.tsx:1:27)
    at <unknown> (Error: (./src/components/BarraNavegacion/BarraNavegacion.tsx:1:27)
[browser] ./src/components/BarraNavegacion/BarraNavegacion.tsx:1:27
You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState, useEffect } from 'react';
    |                           ^^^^^^^^^
  2 | import Link from 'next/link';
  3 | import { usePathname } from 'next/navigation';
  4 | import styles from './BarraNavegacion.module.css';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BarraNavegacion/BarraNavegacion.tsx:3:10
You're importing a module that depends on `usePathname` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  1 | import React, { useState, useEffect } from 'react';
  2 | import Link from 'next/link';
> 3 | import { usePathname } from 'next/navigation';
    |          ^^^^^^^^^^^
  4 | import styles from './BarraNavegacion.module.css';
  5 | import { useAlternarMenu } from '@/hooks/useAlternarMenu';
  6 | import { Boton } from '../Boton/Boton';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BarraNavegacion/BarraNavegacion.tsx:1:17
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState, useEffect } from 'react';
    |                 ^^^^^^^^
  2 | import Link from 'next/link';
  3 | import { usePathname } from 'next/navigation';
  4 | import styles from './BarraNavegacion.module.css';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BotonFlotanteFrap/BotonFlotanteFrap.tsx:1:17
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState } from 'react';
    |                 ^^^^^^^^
  2 | import styles from './BotonFlotanteFrap.module.css';
  3 | import { motion, AnimatePresence } from 'framer-motion';
  4 |

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BotonFlotanteFrap/BotonFlotanteFrap.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/hooks/useAlternarMenu.ts:1:10
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import { useState, useCallback } from 'react';
    |          ^^^^^^^^
  2 |
  3 | export const useAlternarMenu = (estadoInicial: boolean = false) => {
  4 |   const [estaAbierto, setEstaAbierto] = useState(estadoInicial);

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/hooks/useAlternarMenu.ts
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BarraNavegacion/BarraNavegacion.tsx:1:27
You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState, useEffect } from 'react';
    |                           ^^^^^^^^^
  2 | import Link from 'next/link';
  3 | import { usePathname } from 'next/navigation';
  4 | import styles from './BarraNavegacion.module.css';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BarraNavegacion/BarraNavegacion.tsx:3:10
You're importing a module that depends on `usePathname` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  1 | import React, { useState, useEffect } from 'react';
  2 | import Link from 'next/link';
> 3 | import { usePathname } from 'next/navigation';
    |          ^^^^^^^^^^^
  4 | import styles from './BarraNavegacion.module.css';
  5 | import { useAlternarMenu } from '@/hooks/useAlternarMenu';
  6 | import { Boton } from '../Boton/Boton';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BarraNavegacion/BarraNavegacion.tsx:1:17
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState, useEffect } from 'react';
    |                 ^^^^^^^^
  2 | import Link from 'next/link';
  3 | import { usePathname } from 'next/navigation';
  4 | import styles from './BarraNavegacion.module.css';

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BarraNavegacion/BarraNavegacion.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/components/BotonFlotanteFrap/BotonFlotanteFrap.tsx:1:17
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import React, { useState } from 'react';
    |                 ^^^^^^^^
  2 | import styles from './BotonFlotanteFrap.module.css';
  3 | import { motion, AnimatePresence } from 'framer-motion';
  4 |

Ecmascript file had an error

Import trace:
  Server Component:
    ./src/components/BotonFlotanteFrap/BotonFlotanteFrap.tsx
    ./src/app/layout.tsx
    at handleErrors (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
    at processMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2834:28)
    at <unknown> (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2679:13)
    at WebSocket.handleMessage (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2324:17) (file://C:/Users/GamingWorld/OneDrive/Desktop/hispano tesis peru/Templates-Web/templates-cafeterias/cafeteria-nextjs/.next/dev/static/chunks/09do_next_dist_client_0mglhn~._.js:2773:21)
[browser] ./src/hooks/useAlternarMenu.ts:1:10
You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
> 1 | import { useState, useCallback } from 'react';
    |          ^^^^^^^^
  2 |