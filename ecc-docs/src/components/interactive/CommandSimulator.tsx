/**
 * CommandSimulator Component
 * 
 * An interactive component that simulates ECC slash commands.
 * Users can type commands and see simulated outputs.
 */

import React, { useState, useCallback, useMemo } from 'react'
import styles from './CommandSimulator.module.css'

interface CommandSimulatorProps {
  /** Available commands to simulate */
  availableCommands?: string[]
  /** Map of command to output */
  commandOutputs?: Record<string, string>
  /** Callback when command is executed */
  onCommandExecute?: (command: string) => void
  /** Placeholder text for input */
  placeholder?: string
}

export function CommandSimulator({
  availableCommands = ['/plan', '/tdd', '/e2e', '/code-review'],
  commandOutputs = {
    '/plan': '🎯 Planning mode activated! What would you like to build today?',
    '/tdd': '🧪 TDD Guide activated! Let\'s write tests first, then code!',
    '/e2e': '🎭 E2E Runner activated! Ready to test your user journeys!',
    '/code-review': '🔍 Code Review mode! Let me analyze your code...',
  },
  onCommandExecute,
  placeholder = 'Type a command (e.g., /plan)...',
}: CommandSimulatorProps) {
  const [inputValue, setInputValue] = useState('')
  const [output, setOutput] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([])

  // Filter commands based on input for autocomplete
  const suggestions = useMemo(() => {
    if (!inputValue.startsWith('/')) return []
    return availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }, [inputValue, availableCommands])

  const executeCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim()
    const commandOutput = commandOutputs[trimmedCommand] || `❓ Unknown command: ${trimmedCommand}`
    
    setOutput(commandOutput)
    setHistory(prev => [...prev, { command: trimmedCommand, output: commandOutput }])
    setInputValue('')
    
    onCommandExecute?.(trimmedCommand)
  }, [commandOutputs, onCommandExecute])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      executeCommand(inputValue)
    }
  }

  const handleSuggestionClick = (command: string) => {
    setInputValue(command)
  }

  return (
    <div className={styles.simulator}>
      {/* Terminal Header */}
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ backgroundColor: '#ff5f56' }} />
          <span className={styles.dot} style={{ backgroundColor: '#ffbd2e' }} />
          <span className={styles.dot} style={{ backgroundColor: '#27c93f' }} />
        </div>
        <span className={styles.title}>ECC Command Simulator</span>
      </div>

      {/* Command History */}
      <div className={styles.terminal} aria-live="polite">
        {history.map((entry, index) => (
          <div key={index} className={styles.historyEntry}>
            <div className={styles.command}>
              <span className={styles.prompt}>❯</span> {entry.command}
            </div>
            <div className={styles.output}>{entry.output}</div>
          </div>
        ))}

        {/* Current Output */}
        {output && history.length === 0 && (
          <div className={styles.output}>{output}</div>
        )}

        {/* Input Area */}
        <div className={styles.inputArea}>
          <span className={styles.prompt}>❯</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.input}
            autoFocus
          />
        </div>

        {/* Autocomplete Suggestions */}
        {suggestions.length > 0 && inputValue && (
          <div className={styles.suggestions}>
            {suggestions.map(cmd => (
              <button
                key={cmd}
                className={styles.suggestion}
                onClick={() => handleSuggestionClick(cmd)}
              >
                {cmd}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Available Commands */}
      <div className={styles.commandList} role="list" aria-label="Available commands">
        <span className={styles.commandListTitle}>Available Commands:</span>
        {availableCommands.map(cmd => (
          <button
            key={cmd}
            className={styles.commandButton}
            onClick={() => executeCommand(cmd)}
            role="listitem"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CommandSimulator
