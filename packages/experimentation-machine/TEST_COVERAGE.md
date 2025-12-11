# Test Coverage for Experimentation Machine

## Overview
Comprehensive test suite with **89 passing tests** covering all core functionality of the experimentation-machine package.

## Test File
- **Location**: `src/index.test.ts`
- **Lines of Code**: 855
- **Test Framework**: Vitest
- **Pass Rate**: 100% (89/89 tests passing)

## Test Categories

### 1. Helper Functions (45 tests)

#### calculateICEScore (3 tests)
- ✓ Calculates ICE score correctly
- ✓ Handles zero values
- ✓ Handles decimal values

#### calculateRICEScore (4 tests)
- ✓ Calculates RICE score correctly
- ✓ Handles minimal impact scenarios
- ✓ Handles high effort scenarios
- ✓ Returns Infinity when effort is zero

#### calculatePIEScore (3 tests)
- ✓ Calculates PIE score as average
- ✓ Handles decimal values
- ✓ Returns score between min and max values

#### calculateRequiredSampleSize (5 tests)
- ✓ Calculates sample size for typical conversion rates
- ✓ Returns larger samples for smaller MDE
- ✓ Returns larger samples for higher power
- ✓ Handles default parameters
- ✓ Returns reasonable values for common scenarios

#### calculateSignificance (5 tests)
- ✓ Detects significant difference
- ✓ Does not detect significance with small sample
- ✓ Detects significance with large effect
- ✓ Handles equal conversion rates
- ✓ Calculates correct z-score direction

#### calculateUplift (5 tests)
- ✓ Calculates positive uplift
- ✓ Calculates negative uplift
- ✓ Handles zero uplift
- ✓ Handles 100% uplift
- ✓ Handles decimal conversion rates

#### getExperimentTypeGuide (3 tests)
- ✓ Returns guide for each experiment type
- ✓ Returns correct complexity for known types
- ✓ Has unique descriptions

#### getMaturityLevel (3 tests)
- ✓ Returns details for each maturity level
- ✓ Has correct progression
- ✓ Provides actionable next steps

#### getSevenQuestions (4 tests)
- ✓ Returns all seven questions
- ✓ Returns a copy, not the original
- ✓ Has correct structure for each question
- ✓ Covers key experimentation principles

#### assessWinRate (5 tests)
- ✓ Identifies below-range win rate
- ✓ Identifies healthy win rate
- ✓ Identifies above-range win rate
- ✓ Handles boundary cases
- ✓ Always returns a recommendation

#### calculateSTEDIIScore (5 tests)
- ✓ Calculates average of all six dimensions
- ✓ Handles perfect scores
- ✓ Handles minimum scores
- ✓ Handles decimal scores
- ✓ Returns value in valid range

### 2. Constants Validation (24 tests)

#### THOMKE_SEVEN_QUESTIONS (4 tests)
- ✓ Exports seven questions
- ✓ Has sequential numbering
- ✓ Has all required properties
- ✓ Has criteria for each question

#### RICE_IMPACT_SCALE (5 tests)
- ✓ Exports five impact levels
- ✓ Has descending scores
- ✓ Has all required properties
- ✓ Has correct score range
- ✓ Has unique labels

#### EXPERIMENT_TYPES_GUIDE (4 tests)
- ✓ Has guides for all experiment types
- ✓ Has all required properties for each type
- ✓ Has valid complexity levels
- ✓ Has non-empty best-for arrays

#### MATURITY_LEVELS (3 tests)
- ✓ Has all five maturity levels
- ✓ Has all required properties for each level
- ✓ Has non-empty arrays

#### WIN_RATE_BENCHMARKS (3 tests)
- ✓ Has all benchmark categories
- ✓ Has required properties for each range
- ✓ Has ideal target

#### Re-exported Constants (4 tests)
- ✓ Exports SEVEN_QUESTIONS (alias for THOMKE_SEVEN_QUESTIONS)
- ✓ Exports TYPES (alias for EXPERIMENT_TYPES_GUIDE)
- ✓ Exports MATURITY (alias for MATURITY_LEVELS)
- ✓ Exports BENCHMARKS (alias for WIN_RATE_BENCHMARKS)

### 3. Statistical Calculation Accuracy (17 tests)

#### Sample Size Calculations (3 tests)
- ✓ Matches known sample size for standard scenario
- ✓ Handles very small conversion rates
- ✓ Handles high conversion rates

#### Significance Testing (4 tests)
- ✓ Correctly identifies clear winner
- ✓ Does not find significance in noise
- ✓ Has symmetric results
- ✓ Calculates reasonable p-values

#### Uplift Calculations (3 tests)
- ✓ Calculates percentage change correctly
- ✓ Works with conversion rates
- ✓ Handles large uplifts

#### Edge Cases and Validation (3 tests)
- ✓ Handles very small numbers
- ✓ Handles numbers close to 1
- ✓ Maintains precision in uplift calculation

#### Real-world Scenarios (3 tests)
- ✓ Handles typical e-commerce conversion rates (2-3%)
- ✓ Handles SaaS signup rates (5-10%)
- ✓ Handles email open rates (20-30%)

#### STEDII Scoring Consistency (2 tests)
- ✓ Maintains score relationships
- ✓ Handles all same scores

### 4. Integration Tests (3 tests)

#### Complete Experiment Workflow
- ✓ Supports end-to-end calculation flow
- ✓ Supports prioritization workflow
- ✓ Supports maturity assessment workflow

## Running the Tests

```bash
# Run all tests
npm test

# Run tests with verbose output
npx vitest run --reporter=verbose

# Run tests in watch mode
npx vitest
```

## Test Results

```
Test Files  1 passed (1)
Tests       89 passed (89)
Duration    ~350ms
```

## What's Tested

### ✅ All Helper Functions
- ICE scoring (Impact × Confidence × Ease)
- RICE scoring ((Reach × Impact × Confidence) / Effort)
- PIE scoring ((Potential + Importance + Ease) / 3)
- Sample size calculations for A/B tests
- Statistical significance testing (z-test)
- Uplift calculations
- Experiment type guide retrieval
- Maturity level assessments
- Thomke's 7 questions
- Win rate assessments
- STEDII metric quality scoring

### ✅ All Constants
- THOMKE_SEVEN_QUESTIONS
- RICE_IMPACT_SCALE
- EXPERIMENT_TYPES_GUIDE
- MATURITY_LEVELS
- WIN_RATE_BENCHMARKS
- All re-exported aliases

### ✅ Statistical Accuracy
- Correct sample size calculations
- Proper significance testing
- Accurate uplift measurements
- Edge case handling
- Real-world scenario validation

### ✅ Integration Flows
- Complete experiment workflows
- Prioritization frameworks
- Maturity assessments

## Notes

- All AI-powered functions are defined in the source but not directly tested (they require AI runtime)
- The test suite focuses on pure calculation functions and constants
- Floating-point precision is handled appropriately with `toBeCloseTo()` matchers
- Mock `ai-functions` module created for testing purposes
