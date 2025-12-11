# Design Sprint Package - Test Documentation

## Overview

This document describes the comprehensive test suite for the design-sprint package. The test suite uses Vitest and covers all helper functions, constants, type structures, and integration scenarios.

## Test Statistics

- **Total Tests**: 80
- **Test File**: `src/index.test.ts`
- **All tests passing**: ✓

## Test Coverage

### 1. Helper Functions (34 tests)

#### `getSprintDay` (7 tests)
- ✓ Returns Monday (day 1) activities
- ✓ Returns Tuesday (day 2) activities
- ✓ Returns Wednesday (day 3) activities
- ✓ Returns Thursday (day 4) activities
- ✓ Returns Friday (day 5) activities
- ✓ Returns undefined for invalid day
- ✓ Returns day with all required activity properties

#### `getPrototypeTools` (8 tests)
- ✓ Returns tools for click-through prototype
- ✓ Returns tools for physical-mockup prototype
- ✓ Returns tools for service-roleplay prototype
- ✓ Returns tools for landing-page prototype
- ✓ Returns tools for video prototype
- ✓ Returns tools for paper prototype
- ✓ Returns empty array for invalid prototype type
- ✓ Returns all prototype types as defined in PROTOTYPE_TOOLS

#### `getMistakesByCategory` (8 tests)
- ✓ Returns team-related mistakes
- ✓ Returns scope-related mistakes
- ✓ Returns process-related mistakes
- ✓ Returns testing-related mistakes
- ✓ Returns preparation-related mistakes
- ✓ Returns empty array for non-existent category
- ✓ Returns mistakes with required properties
- ✓ Has specific team mistakes about composition and decider

#### `calculateSprintDuration` (4 tests)
- ✓ Returns a positive number
- ✓ Calculates correct total hours for all 5 days
- ✓ Matches manual calculation of all activities
- ✓ Is consistent across multiple calls

#### `validateTeamComposition` (7 tests)
- ✓ Validates a properly composed team
- ✓ Flags team that is too large
- ✓ Flags when decider is not available full-time
- ✓ Flags missing designer
- ✓ Flags missing user researcher
- ✓ Flags multiple issues at once
- ✓ Returns result with correct structure

#### `getFiveActTemplate` (6 tests)
- ✓ Returns a copy of the Five-Act interview template
- ✓ Has all 5 acts
- ✓ Has correct act numbers
- ✓ Has correct act names
- ✓ Has correct durations totaling about 60 minutes
- ✓ Has sprint questions array
- ✓ Returns a new copy each time (not the same reference)

### 2. Constants (26 tests)

#### `SPRINT_DAYS` (7 tests)
- ✓ Exports SPRINT_DAYS constant
- ✓ Has exactly 5 days
- ✓ Has days in correct order
- ✓ Has correct day names
- ✓ Has correct themes
- ✓ Has activities for each day
- ✓ Has complete activity information

#### `FIVE_ACT_INTERVIEW` (5 tests)
- ✓ Exports FIVE_ACT_INTERVIEW constant
- ✓ Has all 5 acts defined
- ✓ Has script content for each act
- ✓ Has tips for each act
- ✓ Has appropriate questions for context and debrief acts

#### `PROTOTYPE_TOOLS` (5 tests)
- ✓ Exports PROTOTYPE_TOOLS constant
- ✓ Has all prototype types
- ✓ Has arrays of tools for each type
- ✓ Has well-known tools for click-through
- ✓ Has appropriate tools for each category

#### `COMMON_SPRINT_MISTAKES` (4 tests)
- ✓ Exports COMMON_SPRINT_MISTAKES constant
- ✓ Has multiple mistakes defined
- ✓ Has complete information for each mistake
- ✓ Has mistakes in multiple categories

#### Re-exported Constants (4 tests)
- ✓ Re-exports SPRINT_DAYS as DAYS
- ✓ Re-exports FIVE_ACT_INTERVIEW as INTERVIEW_TEMPLATE
- ✓ Re-exports PROTOTYPE_TOOLS as TOOLS
- ✓ Re-exports COMMON_SPRINT_MISTAKES as MISTAKES

### 3. Type Structure Validation (8 tests)

- ✓ Allows creating valid SprintChallenge object
- ✓ Allows creating valid TeamMember objects with all roles
- ✓ Allows creating valid SprintTeam object
- ✓ Allows creating valid prototype types
- ✓ Allows creating valid SprintDay object
- ✓ Allows creating valid InterviewScript object
- ✓ Allows SprintQuestion with different categories
- ✓ Allows SprintQuestion with different priorities

### 4. Integration Tests (6 tests)

- ✓ Works together: get day and validate activities
- ✓ Calculates duration correctly across all days
- ✓ Gets tools for all prototype types
- ✓ Gets mistakes for all categories
- ✓ Validates team and suggests improvements based on mistakes
- ✓ Combines Five-Act template with sprint questions

## Running the Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with verbose output
```bash
npm test -- --reporter=verbose
```

## Test Configuration

The test suite uses a custom Vitest configuration (`vitest.config.ts`) that:

1. Sets up the test environment as Node.js
2. Configures module aliases for the `ai-functions` dependency
3. Enables global test utilities

### Mock Dependencies

The `ai-functions` package is mocked in `test/mocks/ai-functions.ts` to allow testing without the actual AI integration. The mock provides a stub `AI` function that throws an error if called, ensuring tests don't depend on AI functionality.

## What's Tested

### Helper Functions
All five helper functions are thoroughly tested with:
- Normal/expected inputs
- Edge cases (invalid inputs)
- Return value structure validation
- Consistency checks

### Constants
All constants are validated to ensure:
- Proper export
- Correct structure and data
- Completeness of information
- Consistency across related constants

### Type Structures
TypeScript type definitions are validated by:
- Creating instances of each major type
- Testing all enum values
- Verifying type compatibility
- Ensuring proper type inference

### Integration
Integration tests verify that:
- Functions work together correctly
- Data flows properly between components
- Calculations are consistent
- Real-world usage patterns work as expected

## Design Sprint Methodology Tested

The tests validate the complete Jake Knapp Design Sprint framework:

1. **Monday (Map)**: Sprint mapping and target selection
2. **Tuesday (Sketch)**: Lightning demos and solution sketching
3. **Wednesday (Decide)**: Art museum, heat mapping, and storyboarding
4. **Thursday (Prototype)**: Prototype creation and interview script preparation
5. **Friday (Test)**: Five-Act interview structure for user testing

## Maintenance

When updating the design-sprint package:

1. Update types → Update type validation tests
2. Add helper functions → Add corresponding test suite
3. Modify constants → Update constant validation tests
4. Change AI functions → Tests continue to work (mocked)

## Files

- **Test file**: `/src/index.test.ts`
- **Config file**: `/vitest.config.ts`
- **Mock file**: `/test/mocks/ai-functions.ts`
- **Source file**: `/src/index.ts`
