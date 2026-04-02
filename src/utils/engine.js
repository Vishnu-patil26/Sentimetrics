/**
 * Content-Based Filtering Engine
 * ================================
 * Algorithm:
 *  1. Min-Max Normalize all features across the known dataset range
 *  2. Build normalized vectors for both user preferences and each phone
 *  3. Compute weighted Euclidean distance between user vector and each phone vector
 *  4. Apply a "Dealbreaker" weight multiplier to one chosen feature
 *  5. Convert distance to a match percentage (closer = higher %)
 *  6. Sort ascending by distance and return top N results
 */

import { phones, FEATURE_CONFIG, ALL_FEATURES } from '../api/mobileData.js';

// ─── Step 1: Min-Max Normalization ────────────────────────────────────────────
/**
 * Normalizes a raw value to [0, 1] using the global feature range from FEATURE_CONFIG.
 * Formula: normalized = (value - min) / (max - min)
 *
 * This ensures a 5000mAh battery (large number) doesn't dominate a 9/10 design
 * score (small number) simply because of different unit scales.
 */
function normalize(feature, value) {
  const { min, max } = FEATURE_CONFIG[feature];
  if (max === min) return 0;
  return (value - min) / (max - min);
}

// ─── Step 2: Build Normalized Vectors ─────────────────────────────────────────
/**
 * Converts a phone or user-preference object into a normalized 14-dimensional vector.
 * Each element corresponds to one feature in ALL_FEATURES.
 */
function buildVector(obj) {
  return ALL_FEATURES.map(feature => normalize(feature, obj[feature]));
}

// ─── Step 3 & 4: Weighted Euclidean Distance ──────────────────────────────────
/**
 * Computes the Euclidean distance between two normalized vectors with feature weighting.
 *
 * Standard Euclidean Distance:  d = sqrt( Σ (a_i - b_i)² )
 * Weighted Euclidean Distance:  d = sqrt( Σ w_i * (a_i - b_i)² )
 *
 * For the "Dealbreaker" feature, we apply a weight multiplier of 5×
 * so that mismatches on that feature contribute far more to the distance.
 * All other features get a default weight of 1.
 *
 * @param {number[]} vecA - Normalized user preference vector
 * @param {number[]} vecB - Normalized phone feature vector
 * @param {string|null} dealbreaker - Feature key that should be heavily weighted
 * @returns {number} Weighted Euclidean distance (lower = better match)
 */
function weightedEuclidean(vecA, vecB, dealbreaker = null) {
  const DEALBREAKER_WEIGHT = 5.0;
  const DEFAULT_WEIGHT = 1.0;

  const sumOfSquares = ALL_FEATURES.reduce((sum, feature, i) => {
    const weight = feature === dealbreaker ? DEALBREAKER_WEIGHT : DEFAULT_WEIGHT;
    const diff = vecA[i] - vecB[i];
    return sum + weight * diff * diff;
  }, 0);

  return Math.sqrt(sumOfSquares);
}

// ─── Step 5: Distance → Match Percentage ──────────────────────────────────────
/**
 * Converts a distance score to an intuitive match percentage.
 * The max possible weighted Euclidean distance (all features at opposite extremes
 * with one dealbreaker) is sqrt(5 + 13) = sqrt(18) ≈ 4.24.
 * We normalize against that ceiling, then invert so 0 distance = 100% match.
 *
 * @param {number} distance
 * @param {number} maxDistance - The maximum observed distance in the current result set
 * @returns {number} Match percentage (0–100)
 */
function distanceToPercent(distance, maxDistance) {
  if (maxDistance === 0) return 100;
  return Math.round((1 - distance / maxDistance) * 100);
}

// ─── Main Recommendation Function ─────────────────────────────────────────────
/**
 * Runs the full content-based filtering pipeline.
 *
 * @param {Object} userPrefs - User preference object with all 14 feature keys
 * @param {string|null} dealbreaker - The feature the user considers most important
 * @returns {Object[]} Array of result objects sorted by match (best first), each containing:
 *   { phone, distance, matchPercent }
 */
export function getRecommendations(userPrefs, dealbreaker = null) {
  const userVector = buildVector(userPrefs);

  const scored = phones.map(phone => {
    const phoneVector = buildVector(phone);
    const distance = weightedEuclidean(userVector, phoneVector, dealbreaker);
    return { phone, distance };
  });

  // Sort ascending by distance (closest = best match)
  scored.sort((a, b) => a.distance - b.distance);

  // Compute match percentages relative to the worst match in the list
  const maxDistance = scored[scored.length - 1].distance;

  const results = scored.map(item => ({
    ...item,
    matchPercent: distanceToPercent(item.distance, maxDistance),
  }));

  return results;
}

/**
 * Selects the 3 UI "slots" from the sorted recommendations:
 *  - "Perfect Match":    The #1 closest match overall
 *  - "Budget Pick":      Best match that is strictly cheaper than the Perfect Match
 *  - "Premium Upgrade":  Best match that is strictly more expensive than the Perfect Match
 *
 * Falls back to 2nd and 3rd best if no price-bracket match exists.
 *
 * @param {Object[]} recommendations - Sorted results from getRecommendations()
 * @returns {{ perfect, budget, premium }}
 */
export function selectTop3(recommendations) {
  const perfect = recommendations[0];
  const perfectPrice = perfect.phone.price;

  const budgetCandidates  = recommendations.slice(1).filter(r => r.phone.price < perfectPrice);
  const premiumCandidates = recommendations.slice(1).filter(r => r.phone.price > perfectPrice);

  const budget  = budgetCandidates.length  > 0 ? budgetCandidates[0]  : recommendations[1];
  const premium = premiumCandidates.length > 0 ? premiumCandidates[0] : recommendations[2] || recommendations[1];

  return { perfect, budget, premium };
}
