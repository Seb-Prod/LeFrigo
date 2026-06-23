/* ── Images de démonstration ───────────────────────────── */

const DEV_IMAGES = [
  "/test_image1.jpg",
  "/test_image2.jpg",
  "/test_image3.jpg",
  "/test_image4.png",
  "/test_image5.jpg",
  "/test_image6.jpg",
  "/test_image7.jpg",
];

/**
 * Retourne une image de démonstration aléatoire.
 */
export function getRandomDevImage(): string | null {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return DEV_IMAGES[Math.floor(Math.random() * DEV_IMAGES.length)];
}