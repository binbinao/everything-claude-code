/**
 * CodePlayground Component
 * 
 * An interactive code editor with run and reset functionality.
 * Users can edit code and see simulated output.
 */

import React, { useState, useCallback } from 'react'
import styles from './CodePlayground.module.css'

interface CodePlaygroundProps {
  /** Initial code to display */
  initialCode: string
  /** Language for syntax highlighting hint */
  language?: string
  /** Callback when code is run */
  onRun?: (code: string) => string | void
  /** Title for the playground */
  title?: string
  /** Whether the code is editable */
  editable?: boolean
}

export function CodePlayground({
  initialCode,
  language = 'typescript',
  onRun,
  title = 'Code Playground',
  editable = true,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRun = useCallback(() => {
    setIsRunning(true)
    setError(null)
    
    try {
      // Simulate code execution
      // In a real implementation, you might use a sandboxed iframe or web worker
      let result: string
      
      if (onRun) {
        const customResult = onRun(code)
        result = customResult || 'Code executed successfully!'
      } else {
        // Simple simulation: extract console.log statements
        const logMatches = code.match(/console\.log\s*\(\s*(['"`])(.*?)\1\s*\)/g)
        if (logMatches) {
          result = logMatches
            .map(match => {
              const content = match.match(/console\.log\s*\(\s*(['"`])(.*?)\1\s*\)/)
              return content ? `> ${content[2]}` : ''
            })
            .join('\n')
        } else {
          result = '✅ Code executed successfully! (No output)'
        }
      }
      
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsRunning(false)
    }
  }, [code, onRun])

  const handleReset = useCallback(() => {
    setCode(initialCode)
    setOutput(null)
    setError(null)
  }, [initialCode])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      // Could show a toast notification here
    } catch (err) {
      console.error('Failed to copy code')
    }
  }, [code])

  return (
    <div className={styles.playground}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>{title}</span>
          <span className={styles.language}>{language}</span>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.actionButton} 
            onClick={handleCopy}
            title="Copy code"
          >
            📋
          </button>
          <button 
            className={`${styles.actionButton} ${styles.resetButton}`}
            onClick={handleReset}
            title="Reset code"
            aria-label="Reset"
          >
            ↺ Reset
          </button>
          <button 
            className={`${styles.actionButton} ${styles.runButton}`}
            onClick={handleRun}
            disabled={isRunning}
            aria-label="Run"
          >
            {isRunning ? '⏳ Running...' : '▶ Run'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className={styles.editorContainer}>
        <textarea
          className={styles.editor}
          value={code}
          onChange={(e) => editable && setCode(e.target.value)}
          readOnly={!editable}
          spellCheck={false}
          data-testid="code-editor"
        />
        <div className={styles.lineNumbers}>
          {code.split('\n').map((_, i) => (
            <div key={i} className={styles.lineNumber}>{i + 1}</div>
          ))}
        </div>
      </div>

      {/* Output Area */}
      {(output || error) && (
        <div className={`${styles.output} ${error ? styles.error : ''}`} data-testid="output-area">
          <div className={styles.outputHeader}>
            <span>{error ? '❌ Error' : '📤 Output'}</span>
          </div>
          <pre className={styles.outputContent}>
            {error || output}
          </pre>
        </div>
      )}
    </div>
  )
}

export default CodePlayground
