/* ── Images de démonstration ───────────────────────────── */

const DEV_IMAGES = [
  "/images/fake/test_image1.jpg",
  "/images/fake/test_image2.jpg",
  "/images/fake/test_image3.jpg",
  "/images/fake/test_image4.png",
  "/images/fake/test_image5.jpg",
  "/images/fake/test_image6.jpg",
  "/images/fake/test_image7.jpg",
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