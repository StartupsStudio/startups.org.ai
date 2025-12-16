/**
 * LeanCanvas React Component
 *
 * Renders a Lean Canvas in the traditional layout format.
 * Based on Ash Maurya's adaptation of the Business Model Canvas.
 */

import * as React from 'react'

// =============================================================================
// TYPES - Simplified for visualization
// =============================================================================

export interface LeanCanvasData {
  /** Business name */
  name?: string
  /** One-line description */
  tagline?: string
  /** Problem section */
  problem: {
    problems: string[]
    existingAlternatives?: string[]
  }
  /** Solution section */
  solution: {
    solutions: string[]
  }
  /** Key Metrics */
  keyMetrics?: {
    metrics?: string[]
  }
  /** Unique Value Proposition */
  uniqueValueProposition: {
    headline: string
    highLevelConcept?: string
  }
  /** Unfair Advantage */
  unfairAdvantage?: {
    advantage: string
  }
  /** Customer Segments */
  customerSegments: {
    segments: string[]
    earlyAdopters?: string[]
  }
  /** Channels */
  channels?: {
    channels: string[]
  }
  /** Cost Structure */
  costStructure?: {
    costs: string[]
  }
  /** Revenue Streams */
  revenueStreams?: {
    streams: string[]
  }
}

export interface LeanCanvasProps {
  /** The canvas data to display */
  data: LeanCanvasData
  /** Optional title override */
  title?: string
  /** Color theme */
  theme?: 'light' | 'dark' | 'auto'
  /** Whether to show section numbers */
  showNumbers?: boolean
  /** Custom class name */
  className?: string
}

// =============================================================================
// STYLES
// =============================================================================

const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
  },
  tagline: {
    fontSize: '0.95rem',
    opacity: 0.7,
    marginBottom: '1rem',
    textAlign: 'center' as const,
    fontStyle: 'italic' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'auto auto auto',
    gap: '1px',
    border: '1px solid var(--lean-canvas-border, #e5e7eb)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'var(--lean-canvas-border, #e5e7eb)',
  },
  cell: {
    backgroundColor: 'var(--lean-canvas-bg, #ffffff)',
    padding: '0.75rem',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  cellHeader: {
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    color: 'var(--lean-canvas-header, #6b7280)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  cellNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.25rem',
    height: '1.25rem',
    borderRadius: '50%',
    backgroundColor: 'var(--lean-canvas-number-bg, #f3f4f6)',
    fontSize: '0.65rem',
    fontWeight: 700,
  },
  cellContent: {
    fontSize: '0.8rem',
    lineHeight: 1.4,
    color: 'var(--lean-canvas-text, #374151)',
    flex: 1,
  },
  list: {
    margin: 0,
    paddingLeft: '1rem',
    listStyle: 'disc',
  },
  listItem: {
    marginBottom: '0.25rem',
  },
  subSection: {
    marginTop: '0.75rem',
    paddingTop: '0.5rem',
    borderTop: '1px dashed var(--lean-canvas-border, #e5e7eb)',
  },
  subHeader: {
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    color: 'var(--lean-canvas-subheader, #9ca3af)',
    marginBottom: '0.25rem',
  },
  highlight: {
    fontWeight: 600,
    fontSize: '0.85rem',
    marginBottom: '0.25rem',
  },
  concept: {
    fontStyle: 'italic' as const,
    opacity: 0.8,
    marginTop: '0.5rem',
    fontSize: '0.75rem',
  },
  // Grid positions for the lean canvas layout
  problem: { gridColumn: '1 / 3', gridRow: '1 / 2' },
  existingAlternatives: { gridColumn: '1 / 3', gridRow: '2 / 3' },
  solution: { gridColumn: '3 / 5', gridRow: '1 / 2' },
  keyMetrics: { gridColumn: '3 / 5', gridRow: '2 / 3' },
  uvp: { gridColumn: '5 / 7', gridRow: '1 / 3' },
  unfairAdvantage: { gridColumn: '7 / 9', gridRow: '1 / 2' },
  channels: { gridColumn: '7 / 9', gridRow: '2 / 3' },
  customerSegments: { gridColumn: '9 / 11', gridRow: '1 / 2' },
  earlyAdopters: { gridColumn: '9 / 11', gridRow: '2 / 3' },
  costStructure: { gridColumn: '1 / 6', gridRow: '3 / 4' },
  revenueStreams: { gridColumn: '6 / 11', gridRow: '3 / 4' },
} as const

// =============================================================================
// COMPONENT
// =============================================================================

function Cell({
  title,
  number,
  showNumbers,
  children,
  style,
}: {
  title: string
  number?: number
  showNumbers?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={{ ...styles.cell, ...style }}>
      <div style={styles.cellHeader}>
        {showNumbers && number && <span style={styles.cellNumber}>{number}</span>}
        {title}
      </div>
      <div style={styles.cellContent}>{children}</div>
    </div>
  )
}

function ItemList({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null
  return (
    <ul style={styles.list}>
      {items.map((item, i) => (
        <li key={i} style={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function LeanCanvas({
  data,
  title,
  theme = 'auto',
  showNumbers = true,
  className,
}: LeanCanvasProps) {
  const containerStyle: React.CSSProperties = {
    ...styles.container,
    ...(theme === 'dark'
      ? {
          ['--lean-canvas-bg' as string]: '#1f2937',
          ['--lean-canvas-border' as string]: '#374151',
          ['--lean-canvas-text' as string]: '#e5e7eb',
          ['--lean-canvas-header' as string]: '#9ca3af',
          ['--lean-canvas-subheader' as string]: '#6b7280',
          ['--lean-canvas-number-bg' as string]: '#374151',
        }
      : theme === 'light'
      ? {
          ['--lean-canvas-bg' as string]: '#ffffff',
          ['--lean-canvas-border' as string]: '#e5e7eb',
          ['--lean-canvas-text' as string]: '#374151',
          ['--lean-canvas-header' as string]: '#6b7280',
          ['--lean-canvas-subheader' as string]: '#9ca3af',
          ['--lean-canvas-number-bg' as string]: '#f3f4f6',
        }
      : {}),
  }

  return (
    <div style={containerStyle} className={className}>
      {(title || data.name) && <div style={styles.title}>{title || data.name}</div>}
      {data.tagline && <div style={styles.tagline}>{data.tagline}</div>}

      <div style={styles.grid}>
        {/* Row 1-2: Main content */}
        <Cell title="Problem" number={2} showNumbers={showNumbers} style={styles.problem}>
          <ItemList items={data.problem.problems} />
        </Cell>

        <Cell
          title="Existing Alternatives"
          showNumbers={false}
          style={styles.existingAlternatives}
        >
          <ItemList items={data.problem.existingAlternatives || []} />
        </Cell>

        <Cell title="Solution" number={4} showNumbers={showNumbers} style={styles.solution}>
          <ItemList items={data.solution.solutions} />
        </Cell>

        <Cell title="Key Metrics" number={8} showNumbers={showNumbers} style={styles.keyMetrics}>
          <ItemList items={data.keyMetrics?.metrics || []} />
        </Cell>

        <Cell
          title="Unique Value Proposition"
          number={3}
          showNumbers={showNumbers}
          style={styles.uvp}
        >
          <div style={styles.highlight}>{data.uniqueValueProposition.headline}</div>
          {data.uniqueValueProposition.highLevelConcept && (
            <div style={styles.concept}>{data.uniqueValueProposition.highLevelConcept}</div>
          )}
        </Cell>

        <Cell
          title="Unfair Advantage"
          number={9}
          showNumbers={showNumbers}
          style={styles.unfairAdvantage}
        >
          {data.unfairAdvantage?.advantage || 'To be discovered'}
        </Cell>

        <Cell title="Channels" number={5} showNumbers={showNumbers} style={styles.channels}>
          <ItemList items={data.channels?.channels || []} />
        </Cell>

        <Cell
          title="Customer Segments"
          number={1}
          showNumbers={showNumbers}
          style={styles.customerSegments}
        >
          <ItemList items={data.customerSegments.segments} />
        </Cell>

        <Cell title="Early Adopters" showNumbers={false} style={styles.earlyAdopters}>
          <ItemList items={data.customerSegments.earlyAdopters || []} />
        </Cell>

        {/* Row 3: Cost and Revenue */}
        <Cell
          title="Cost Structure"
          number={7}
          showNumbers={showNumbers}
          style={styles.costStructure}
        >
          <ItemList items={data.costStructure?.costs || []} />
        </Cell>

        <Cell
          title="Revenue Streams"
          number={6}
          showNumbers={showNumbers}
          style={styles.revenueStreams}
        >
          <ItemList items={data.revenueStreams?.streams || []} />
        </Cell>
      </div>
    </div>
  )
}

export default LeanCanvas
