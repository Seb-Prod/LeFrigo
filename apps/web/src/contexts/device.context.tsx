"use client";
import { createContext, useContext, useState } from "react";

/**
 * Type représentant la catégorie d'appareil détectée.
 * - `mobile`  : smartphone (iPhone, Android mobile)
 * - `tablet`  : tablette (iPad, Android tablet)
 * - `desktop` : ordinateur de bureau ou laptop
 */
type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Forme du contexte exposé par {@link DeviceProvider}.
 */
type DeviceContextType = {
  /** Catégorie d'appareil détectée via le User-Agent. */
  device: DeviceType;
  /** `true` si l'appareil tourne sous iOS (iPhone, iPad, iPod). */
  isIOS: boolean;
  /** `true` si l'appareil tourne sous Android. */
  isAndroid: boolean;
  /** `true` si l'application est lancée en mode PWA standalone. */
  isPWA: boolean;
  /** `true` si l'application est lancée sur desktop */
  isDesktop: boolean;
  /** `true` si l'application est lancée sur mobile */
  isMobile: boolean;
  /** `true` si l'application est lancée sur tablette */
  isTablet: boolean;
};

const DeviceContext = createContext<DeviceContextType | null>(null);

/**
 * Détecte le type d'appareil et l'environnement d'exécution depuis le navigateur.
 *
 * @remarks
 * Cette fonction accède à `navigator` et `window` — elle ne doit être appelée
 * que côté client (jamais pendant le SSR).
 *
 * @returns {DeviceContextType} Les informations sur l'appareil courant.
 */
function detectDevice(): DeviceContextType {
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|android.*mobile|windows phone/.test(ua);
  const isTablet = /ipad|tablet/.test(ua);

  return {
    device: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
    isMobile: isMobile,
    isTablet: isTablet,
    isDesktop: !isTablet && !isMobile,
    isIOS: /iphone|ipad|ipod/.test(ua),
    isAndroid: /android/.test(ua),
    isPWA:
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error — standalone est une propriété Safari non standard
      window.navigator.standalone === true,
  };
}

/**
 * Valeurs par défaut retournées côté serveur (SSR).
 * Elles seront écrasées dès l'hydratation côté client.
 */
const SSR_DEFAULT: DeviceContextType = {
  device: "desktop",
  isIOS: false,
  isAndroid: false,
  isPWA: false,
  isDesktop: true,
  isMobile: false,
  isTablet: false,
};

/**
 * Fournisseur de contexte qui détecte et expose les informations sur l'appareil.
 *
 * @remarks
 * Utilise un lazy initializer de `useState` pour détecter l'appareil **une seule fois**
 * au montage, sans `useEffect` ni re-render supplémentaire.
 *
 * @example
 * ```tsx
 * // layout.tsx
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <body>
 *         <DeviceProvider>{children}</DeviceProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * @param {React.ReactNode} children - Les composants enfants qui auront accès au contexte.
 */
export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [deviceInfo] = useState<DeviceContextType>(() =>
    typeof window === "undefined" ? SSR_DEFAULT : detectDevice(),
  );

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
}

/**
 * Hook permettant d'accéder aux informations sur l'appareil courant.
 *
 * @remarks
 * Doit être utilisé à l'intérieur d'un {@link DeviceProvider}.
 * Lance une erreur si utilisé en dehors du provider.
 *
 * @returns {DeviceContextType} Les informations sur l'appareil courant.
 *
 * @throws {Error} Si le hook est appelé en dehors d'un `DeviceProvider`.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { device, isIOS, isPWA } = useDevice();
 *
 *   return <p>Appareil : {device} — iOS : {isIOS ? "oui" : "non"}</p>;
 * }
 * ```
 */
export function useDevice(): DeviceContextType {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevice must be used inside DeviceProvider");
  return ctx;
}
