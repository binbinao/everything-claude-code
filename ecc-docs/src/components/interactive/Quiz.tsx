/**
 * Quiz Component
 * 
 * An interactive quiz component for knowledge testing.
 * Supports multiple choice questions with feedback.
 */

import React, { useState, useCallback } from 'react'
import styles from './Quiz.module.css'

interface QuizProps {
  /** The question text */
  question: string
  /** Array of answer options */
  options: string[]
  /** Index of the correct answer (0-based) */
  correctAnswer: number
  /** Explanation shown after answering */
  explanation?: string
  /** Callback when answer is submitted */
  onAnswer?: (result: { correct: boolean; selectedIndex: number }) => void
}

export function Quiz({
  question,
  options,
  correctAnswer,
  explanation,
  onAnswer,
}: QuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSelect = useCallback((index: number) => {
    if (!isSubmitted) {
      setSelectedIndex(index)
    }
  }, [isSubmitted])

  const handleSubmit = useCallback(() => {
    if (selectedIndex === null) return

    const correct = selectedIndex === correctAnswer
    setIsCorrect(correct)
    setIsSubmitted(true)

    onAnswer?.({ correct, selectedIndex })
  }, [selectedIndex, correctAnswer, onAnswer])

  const handleReset = useCallback(() => {
    setSelectedIndex(null)
    setIsSubmitted(false)
    setIsCorrect(false)
  }, [])

  return (
    <div className={styles.quiz}>
      {/* Question */}
      <div className={styles.questionSection}>
        <span className={styles.questionIcon}>❓</span>
        <h4 className={styles.question}>{question}</h4>
      </div>

      {/* Options */}
      <div className={styles.options} role="radiogroup" aria-label={question}>
        {options.map((option, index) => {
          let optionClass = styles.option
          
          if (selectedIndex === index) {
            optionClass += ` ${styles.selected}`
          }
          
          if (isSubmitted) {
            if (index === correctAnswer) {
              optionClass += ` ${styles.correct}`
            } else if (selectedIndex === index) {
              optionClass += ` ${styles.incorrect}`
            }
          }

          return (
            <div
              key={index}
              className={optionClass}
              onClick={() => handleSelect(index)}
              role="radio"
              aria-checked={selectedIndex === index}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(index)
                }
              }}
            >
              <span className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={styles.optionText}>{option}</span>
              {isSubmitted && index === correctAnswer && (
                <span className={styles.checkmark}>✓</span>
              )}
              {isSubmitted && selectedIndex === index && index !== correctAnswer && (
                <span className={styles.xmark}>✗</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit/Reset Button */}
      <div className={styles.actions}>
        {!isSubmitted ? (
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            aria-label="Submit"
          >
            Check Answer
          </button>
        ) : (
          <button
            className={styles.resetButton}
            onClick={handleReset}
          >
            Try Again
          </button>
        )}
      </div>

      {/* Feedback */}
      {isSubmitted && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          <div className={styles.feedbackHeader}>
            {isCorrect ? (
              <>
                <span className={styles.feedbackIcon}>🎉</span>
                <span>Correct!</span>
              </>
            ) : (
              <>
                <span className={styles.feedbackIcon}>💪</span>
                <span>Incorrect - Keep learning!</span>
              </>
            )}
          </div>
          {explanation && (
            <p className={styles.explanation}>{explanation}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz
