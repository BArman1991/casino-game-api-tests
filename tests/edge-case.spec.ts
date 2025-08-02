import { test, expect } from '@playwright/test';
import { placeBet } from '../helpers/api';
import { testUser } from '../test-data/user';

/**
 * 🎯 Edge Case: Place a bet with zero amount
 * This test checks if the system properly rejects a bet of 0.
 * In real-world scenarios, allowing a bet of zero could be used to game the system or expose logic flaws.
 */

test('🟡 Edge Case: place bet with zero amount should fail', async () => {
  try {
    await placeBet(testUser.id, 0);
    throw new Error('Request should have failed for betAmount = 0');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});
