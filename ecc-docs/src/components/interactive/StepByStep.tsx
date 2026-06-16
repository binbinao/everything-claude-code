/**
 * StepByStep Component
 * 
 * A tutorial component that guides users through steps with progress tracking.
 * Perfect for TDD red-green-refactor cycles!
 */

import React, { useState } from 'react'
import styles from './StepByStep.module.css'

interface Step {
  title: string
  description: string
  code?: string
  tip?: string
}

interface StepByStepProps {
  /** Array of steps to display */
  steps: Step[]
  /** Current active step index (0-based) */
  currentStep?: number
  /** Callback when step changes */
  onStepChange?: (stepIndex: number) => void
  /** Title for the tutorial */
  title?: string
}

export function StepByStep({
  steps,
  currentStep: controlledStep,
  onStepChange,
  title = 'Step-by-Step Tutorial',
}: StepByStepProps) {
  const [internalStep, setInternalStep] = useState(0)
  
  // Use controlled or uncontrolled mode
  const currentStep = controlledStep ?? internalStep
  const isControlled = controlledStep !== undefined

  const handleStepChange = (newStep: number) => {
    if (!isControlled) {
      setInternalStep(newStep)
    }
    onStepChange?.(newStep)
  }

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      handleStepChange(currentStep + 1)
    }
  }

  const goToPrev = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.progress}>
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className={styles.stepIndicators}>
        {steps.map((step, index) => (
          <button
            key={index}
            className={`${styles.stepDot} ${
              index === currentStep ? styles.active : ''
            } ${index < currentStep ? styles.completed : ''}`}
            onClick={() => handleStepChange(index)}
            aria-label={`Go to step ${index + 1}: ${step.title}`}
          >
            {index < currentStep ? '✓' : index + 1}
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <div className={`${styles.stepContent} ${styles.active}`}>
        <div className={styles.stepHeader}>
          <span className={styles.stepNumber}>{currentStep + 1}</span>
          <h4 className={styles.stepTitle}>{currentStepData.title}</h4>
        </div>
        
        <p className={styles.stepDescription}>{currentStepData.description}</p>

        {/* Code Block */}
        {currentStepData.code && (
          <pre className={styles.codeBlock}>
            <code>{currentStepData.code}</code>
          </pre>
        )}

        {/* Tip */}
        {currentStepData.tip && (
          <div className={styles.tip}>
            <span className={styles.tipIcon}>💡</span>
            <span>{currentStepData.tip}</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navigation}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goToPrev}
          disabled={currentStep === 0}
          aria-label="Previous step"
        >
          ← Prev
        </button>
        
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          disabled={currentStep === steps.length - 1}
          aria-label="Next step"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default StepByStep
