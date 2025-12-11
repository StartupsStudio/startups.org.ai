import { describe, it, expect } from 'vitest'
import {
  LECTURES,
  CONCEPTS,
  PHASES,
  BUSINESS_MODELS,
  getLecture,
  getLecturesByCategory,
  getConcept,
  getPhase,
  getBusinessModel,
  getRelatedConcepts,
  type Lecture,
  type YCConcept,
  type StartupPhase,
  type BusinessModel,
  type LectureCategory,
} from './curriculum.js'

describe('curriculum', () => {
  describe('LECTURES', () => {
    it('should have lectures array', () => {
      expect(Array.isArray(LECTURES)).toBe(true)
      expect(LECTURES.length).toBeGreaterThan(15)
    })

    it('should have lectures with proper structure', () => {
      LECTURES.forEach((lecture) => {
        expect(lecture).toHaveProperty('id')
        expect(lecture).toHaveProperty('title')
        expect(lecture).toHaveProperty('speaker')
        expect(lecture).toHaveProperty('category')
        expect(lecture).toHaveProperty('concepts')
        expect(lecture).toHaveProperty('takeaways')
        expect(typeof lecture.id).toBe('string')
        expect(typeof lecture.title).toBe('string')
        expect(typeof lecture.speaker).toBe('string')
        expect(Array.isArray(lecture.concepts)).toBe(true)
        expect(Array.isArray(lecture.takeaways)).toBe(true)
      })
    })

    it('should have key lectures', () => {
      const ids = LECTURES.map((l) => l.id)
      expect(ids).toContain('get-ideas')
      expect(ids).toContain('talk-to-users')
      expect(ids).toContain('build-mvp')
      expect(ids).toContain('launch')
      expect(ids).toContain('pitch')
      expect(ids).toContain('pivoting')
    })

    it('should have speakers', () => {
      const speakers = [...new Set(LECTURES.map((l) => l.speaker))]
      expect(speakers).toContain('Kevin Hale')
      expect(speakers).toContain('Michael Seibel')
      expect(speakers).toContain('Eric Migicovsky')
      expect(speakers).toContain('Dalton Caldwell')
    })
  })

  describe('CONCEPTS', () => {
    it('should have concepts array', () => {
      expect(Array.isArray(CONCEPTS)).toBe(true)
      expect(CONCEPTS.length).toBeGreaterThan(10)
    })

    it('should have concepts with proper structure', () => {
      CONCEPTS.forEach((concept) => {
        expect(concept).toHaveProperty('name')
        expect(concept).toHaveProperty('slug')
        expect(concept).toHaveProperty('definition')
        expect(concept).toHaveProperty('examples')
        expect(typeof concept.name).toBe('string')
        expect(typeof concept.slug).toBe('string')
        expect(typeof concept.definition).toBe('string')
        expect(Array.isArray(concept.examples)).toBe(true)
      })
    })

    it('should have key YC concepts', () => {
      const slugs = CONCEPTS.map((c) => c.slug)
      expect(slugs).toContain('tarpit-ideas')
      expect(slugs).toContain('schlep-blindness')
      expect(slugs).toContain('do-things-that-dont-scale')
      expect(slugs).toContain('product-market-fit')
      expect(slugs).toContain('mom-test')
      expect(slugs).toContain('sisp')
      expect(slugs).toContain('safe')
    })

    it('should have related concepts', () => {
      const tarpitConcept = CONCEPTS.find((c) => c.slug === 'tarpit-ideas')
      expect(tarpitConcept?.related).toBeDefined()
      expect(tarpitConcept?.related?.length).toBeGreaterThan(0)
    })
  })

  describe('PHASES', () => {
    it('should have 10 phases', () => {
      expect(PHASES.length).toBe(10)
    })

    it('should have phases in order', () => {
      PHASES.forEach((phase, index) => {
        expect(phase.phase).toBe(index + 1)
      })
    })

    it('should have phases with proper structure', () => {
      PHASES.forEach((phase) => {
        expect(phase).toHaveProperty('phase')
        expect(phase).toHaveProperty('name')
        expect(phase).toHaveProperty('description')
        expect(phase).toHaveProperty('activities')
        expect(phase).toHaveProperty('successCriteria')
        expect(phase).toHaveProperty('mistakes')
        expect(phase).toHaveProperty('lectures')
        expect(Array.isArray(phase.activities)).toBe(true)
        expect(Array.isArray(phase.successCriteria)).toBe(true)
        expect(Array.isArray(phase.mistakes)).toBe(true)
        expect(Array.isArray(phase.lectures)).toBe(true)
      })
    })

    it('should have expected phase names', () => {
      const names = PHASES.map((p) => p.name)
      expect(names).toContain('Idea Generation')
      expect(names).toContain('Team Formation')
      expect(names).toContain('User Research')
      expect(names).toContain('MVP Development')
      expect(names).toContain('Launch')
      expect(names).toContain('Product-Market Fit')
      expect(names).toContain('Growth')
      expect(names).toContain('Fundraising')
      expect(names).toContain('Scaling')
    })

    it('should reference valid lecture IDs', () => {
      const validLectureIds = new Set(LECTURES.map((l) => l.id))

      PHASES.forEach((phase) => {
        phase.lectures.forEach((lectureId) => {
          expect(validLectureIds.has(lectureId)).toBe(true)
        })
      })
    })
  })

  describe('BUSINESS_MODELS', () => {
    it('should have 9 business models', () => {
      expect(BUSINESS_MODELS.length).toBe(9)
    })

    it('should have models with proper structure', () => {
      BUSINESS_MODELS.forEach((model) => {
        expect(model).toHaveProperty('name')
        expect(model).toHaveProperty('description')
        expect(model).toHaveProperty('examples')
        expect(model).toHaveProperty('metrics')
        expect(model).toHaveProperty('revenueModel')
        expect(Array.isArray(model.examples)).toBe(true)
        expect(Array.isArray(model.metrics)).toBe(true)
      })
    })

    it('should have key business models', () => {
      const names = BUSINESS_MODELS.map((m) => m.name)
      expect(names.some((n) => n.includes('SaaS'))).toBe(true)
      expect(names.some((n) => n.includes('Marketplace'))).toBe(true)
      expect(names.some((n) => n.includes('E-commerce'))).toBe(true)
      expect(names.some((n) => n.includes('Subscription'))).toBe(true)
    })

    it('should have metrics with structure', () => {
      BUSINESS_MODELS.forEach((model) => {
        expect(model.metrics.length).toBeGreaterThan(0)
        model.metrics.forEach((metric) => {
          expect(metric).toHaveProperty('name')
          expect(metric).toHaveProperty('description')
        })
      })
    })
  })

  describe('getLecture', () => {
    it('should return lecture by ID', () => {
      const lecture = getLecture('build-mvp')

      expect(lecture).toBeDefined()
      expect(lecture?.id).toBe('build-mvp')
      expect(lecture?.speaker).toBe('Michael Seibel')
    })

    it('should return undefined for invalid ID', () => {
      const lecture = getLecture('invalid-id')

      expect(lecture).toBeUndefined()
    })
  })

  describe('getLecturesByCategory', () => {
    it('should return lectures by category', () => {
      const ideasLectures = getLecturesByCategory('ideas')

      expect(Array.isArray(ideasLectures)).toBe(true)
      expect(ideasLectures.length).toBeGreaterThan(0)
      ideasLectures.forEach((lecture) => {
        expect(lecture.category).toBe('ideas')
      })
    })

    it('should return empty array for category with no lectures', () => {
      const lectures = getLecturesByCategory('nonexistent' as LectureCategory)

      expect(lectures).toEqual([])
    })

    it('should work for all categories', () => {
      const categories: LectureCategory[] = ['ideas', 'users', 'product', 'launch', 'growth', 'metrics', 'fundraising']

      categories.forEach((category) => {
        const lectures = getLecturesByCategory(category)
        expect(Array.isArray(lectures)).toBe(true)
      })
    })
  })

  describe('getConcept', () => {
    it('should return concept by slug', () => {
      const concept = getConcept('tarpit-ideas')

      expect(concept).toBeDefined()
      expect(concept?.slug).toBe('tarpit-ideas')
      expect(concept?.name).toBe('Tarpit Ideas')
    })

    it('should return undefined for invalid slug', () => {
      const concept = getConcept('invalid-slug')

      expect(concept).toBeUndefined()
    })
  })

  describe('getPhase', () => {
    it('should return phase by number', () => {
      const phase = getPhase(1)

      expect(phase).toBeDefined()
      expect(phase?.phase).toBe(1)
      expect(phase?.name).toBe('Idea Generation')
    })

    it('should return phase 5 (Launch)', () => {
      const phase = getPhase(5)

      expect(phase).toBeDefined()
      expect(phase?.name).toBe('Launch')
    })

    it('should return undefined for invalid phase number', () => {
      const phase = getPhase(100)

      expect(phase).toBeUndefined()
    })

    it('should return undefined for zero', () => {
      const phase = getPhase(0)

      expect(phase).toBeUndefined()
    })
  })

  describe('getBusinessModel', () => {
    it('should return business model by name', () => {
      const model = getBusinessModel('SaaS / Enterprise')

      expect(model).toBeDefined()
      expect(model?.name).toBe('SaaS / Enterprise')
    })

    it('should be case insensitive', () => {
      const model1 = getBusinessModel('MARKETPLACE')
      const model2 = getBusinessModel('marketplace')
      const model3 = getBusinessModel('Marketplace')

      expect(model1).toEqual(model2)
      expect(model2).toEqual(model3)
    })

    it('should return undefined for invalid name', () => {
      const model = getBusinessModel('Invalid Model')

      expect(model).toBeUndefined()
    })
  })

  describe('getRelatedConcepts', () => {
    it('should return related concepts', () => {
      const related = getRelatedConcepts('tarpit-ideas')

      expect(Array.isArray(related)).toBe(true)
      expect(related.length).toBeGreaterThan(0)
    })

    it('should return YCConcept objects', () => {
      const related = getRelatedConcepts('do-things-that-dont-scale')

      related.forEach((concept) => {
        expect(concept).toHaveProperty('name')
        expect(concept).toHaveProperty('slug')
        expect(concept).toHaveProperty('definition')
      })
    })

    it('should return empty array for concept with no relations', () => {
      const related = getRelatedConcepts('safe')

      expect(related).toEqual([])
    })

    it('should return empty array for invalid slug', () => {
      const related = getRelatedConcepts('invalid-slug')

      expect(related).toEqual([])
    })
  })

  describe('Type exports', () => {
    it('should export Lecture type', () => {
      const lecture: Lecture = {
        id: 'test',
        title: 'Test',
        speaker: 'Tester',
        category: 'ideas',
        concepts: [],
        takeaways: [],
      }
      expect(lecture).toBeDefined()
    })

    it('should export YCConcept type', () => {
      const concept: YCConcept = {
        name: 'Test',
        slug: 'test',
        definition: 'Test definition',
        examples: [],
      }
      expect(concept).toBeDefined()
    })

    it('should export StartupPhase type', () => {
      const phase: StartupPhase = {
        phase: 1,
        name: 'Test',
        description: 'Test phase',
        activities: [],
        successCriteria: [],
        mistakes: [],
        lectures: [],
      }
      expect(phase).toBeDefined()
    })

    it('should export BusinessModel type', () => {
      const model: BusinessModel = {
        name: 'Test',
        description: 'Test model',
        examples: [],
        metrics: [],
        revenueModel: 'Test',
      }
      expect(model).toBeDefined()
    })

    it('should export LectureCategory type', () => {
      const categories: LectureCategory[] = [
        'ideas',
        'users',
        'product',
        'launch',
        'growth',
        'metrics',
        'team',
        'fundraising',
        'culture',
        'pivot',
        'pricing',
      ]
      expect(categories.length).toBe(11)
    })
  })
})
