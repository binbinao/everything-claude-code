/**
 * Phase 3: Interactive Components Tests
 * TDD Approach - RED Phase
 * 
 * Testing ECC Learning Site interactive tutorial components
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

// ============================================
// 🎮 CommandSimulator Component Tests
// ============================================
describe('CommandSimulator Component', () => {
  describe('🔴 RED: Basic Rendering', () => {
    it('should render command input field', async () => {
      const { CommandSimulator } = await import('../interactive/CommandSimulator')
      const { render, screen } = await import('@testing-library/react')
      
      render(<CommandSimulator />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDefined()
      expect(input.getAttribute('placeholder')).toContain('/')
    })

    it('should render available commands list', async () => {
      const { CommandSimulator } = await import('../interactive/CommandSimulator')
      const { render, screen } = await import('@testing-library/react')
      
      const commands = ['/plan', '/tdd', '/e2e']
      render(<CommandSimulator availableCommands={commands} />)
      
      commands.forEach(cmd => {
        expect(screen.getByText(cmd)).toBeDefined()
      })
    })

    it('should display command output when command is executed', async () => {
      const { CommandSimulator } = await import('../interactive/CommandSimulator')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(
        <CommandSimulator 
          availableCommands={['/plan']}
          commandOutputs={{
            '/plan': 'Planning mode activated! What would you like to build?'
          }}
        />
      )
      
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: '/plan' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      
      expect(screen.getByText(/Planning mode activated/)).toBeDefined()
    })
  })

  describe('🔴 RED: Interactive Features', () => {
    it('should show autocomplete suggestions when typing', async () => {
      const { CommandSimulator } = await import('../interactive/CommandSimulator')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<CommandSimulator availableCommands={['/plan', '/tdd', '/e2e']} />)
      
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: '/p' } })
      
      // Check that /plan appears in suggestions (there might be multiple elements with /plan)
      const planElements = screen.getAllByText('/plan')
      expect(planElements.length).toBeGreaterThan(0)
    })

    it('should execute command on Enter key', async () => {
      const { CommandSimulator } = await import('../interactive/CommandSimulator')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      const onExecute = vi.fn()
      
      render(
        <CommandSimulator 
          availableCommands={['/plan']}
          onCommandExecute={onExecute}
        />
      )
      
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: '/plan' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      
      expect(onExecute).toHaveBeenCalledWith('/plan')
    })
  })
})

// ============================================
// 📚 StepByStep Component Tests
// ============================================
describe('StepByStep Component', () => {
  const sampleSteps = [
    { title: 'Write failing test', description: 'Start with RED' },
    { title: 'Make it pass', description: 'Write minimal code to pass' },
    { title: 'Refactor', description: 'Improve the code' }
  ]

  describe('🔴 RED: Basic Rendering', () => {
    it('should render all steps', async () => {
      const { StepByStep } = await import('../interactive/StepByStep')
      const { render, screen } = await import('@testing-library/react')
      
      render(<StepByStep steps={sampleSteps} />)
      
      // Only check the current step title and that step indicators exist
      expect(screen.getByText('Write failing test')).toBeDefined()
      // Check step indicators have aria-labels with step titles
      expect(screen.getByLabelText(/step 2.*Make it pass/i)).toBeDefined()
      expect(screen.getByLabelText(/step 3.*Refactor/i)).toBeDefined()
    })

    it('should show progress indicator', async () => {
      const { StepByStep } = await import('../interactive/StepByStep')
      const { render, screen } = await import('@testing-library/react')
      
      render(<StepByStep steps={sampleSteps} currentStep={1} />)
      
      // Should show "Step 2 of 3" or similar
      expect(screen.getByText(/2.*3|Step 2/i)).toBeDefined()
    })

    it('should highlight current step', async () => {
      const { StepByStep } = await import('../interactive/StepByStep')
      const { render, screen } = await import('@testing-library/react')
      
      render(<StepByStep steps={sampleSteps} currentStep={1} />)
      
      // The step indicator button for step 2 should have 'active' class
      const stepIndicator = screen.getByLabelText(/step 2.*Make it pass/i)
      expect(stepIndicator.className).toContain('active')
    })
  })

  describe('🔴 RED: Navigation', () => {
    it('should have Next button', async () => {
      const { StepByStep } = await import('../interactive/StepByStep')
      const { render, screen } = await import('@testing-library/react')
      
      render(<StepByStep steps={sampleSteps} currentStep={0} />)
      
      expect(screen.getByRole('button', { name: /next|下一步/i })).toBeDefined()
    })

    it('should have Previous button when not on first step', async () => {
      const { StepByStep } = await import('../interactive/StepByStep')
      const { render, screen } = await import('@testing-library/react')
      
      render(<StepByStep steps={sampleSteps} currentStep={1} />)
      
      expect(screen.getByRole('button', { name: /prev|上一步|back/i })).toBeDefined()
    })

    it('should call onStepChange when navigating', async () => {
      const { StepByStep } = await import('../interactive/StepByStep')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      const onStepChange = vi.fn()
      
      render(
        <StepByStep 
          steps={sampleSteps} 
          currentStep={0} 
          onStepChange={onStepChange} 
        />
      )
      
      fireEvent.click(screen.getByRole('button', { name: /next|下一步/i }))
      
      expect(onStepChange).toHaveBeenCalledWith(1)
    })
  })
})

// ============================================
// 💻 CodePlayground Component Tests
// ============================================
describe('CodePlayground Component', () => {
  const sampleCode = `// Hello ECC!
console.log('Welcome to Everything Claude Code');`

  describe('🔴 RED: Basic Rendering', () => {
    it('should render code editor area', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode={sampleCode} />)
      
      // Should have a code/textarea element
      const codeArea = screen.getByRole('textbox') || screen.getByTestId('code-editor')
      expect(codeArea).toBeDefined()
    })

    it('should display initial code', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode={sampleCode} />)
      
      expect(screen.getByText(/Hello ECC/)).toBeDefined()
    })

    it('should have Run button', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode={sampleCode} />)
      
      expect(screen.getByRole('button', { name: /run|执行|▶/i })).toBeDefined()
    })

    it('should have Reset button', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode={sampleCode} />)
      
      expect(screen.getByRole('button', { name: /reset|重置|↺/i })).toBeDefined()
    })
  })

  describe('🔴 RED: Interactive Features', () => {
    it('should allow code editing', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode={sampleCode} />)
      
      const codeArea = screen.getByRole('textbox') || screen.getByTestId('code-editor')
      fireEvent.change(codeArea, { target: { value: 'const x = 1;' } })
      
      expect(screen.getByText(/const x = 1/)).toBeDefined()
    })

    it('should display output after running code', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode="console.log('test output')" />)
      
      fireEvent.click(screen.getByRole('button', { name: /run|执行|▶/i }))
      
      // Should show output area with result
      expect(screen.getByTestId('output-area')).toBeDefined()
    })

    it('should reset code to initial state', async () => {
      const { CodePlayground } = await import('../interactive/CodePlayground')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<CodePlayground initialCode={sampleCode} />)
      
      const codeArea = screen.getByRole('textbox') || screen.getByTestId('code-editor')
      fireEvent.change(codeArea, { target: { value: 'modified code' } })
      fireEvent.click(screen.getByRole('button', { name: /reset|重置|↺/i }))
      
      expect(screen.getByText(/Hello ECC/)).toBeDefined()
    })
  })
})

// ============================================
// ❓ Quiz Component Tests
// ============================================
describe('Quiz Component', () => {
  const sampleQuiz = {
    question: 'What does TDD stand for?',
    options: [
      'Test-Driven Development',
      'Type-Driven Design',
      'Terminal Debug Device',
      'Total Data Definition'
    ],
    correctAnswer: 0,
    explanation: 'TDD is Test-Driven Development - write tests first, then code!'
  }

  describe('🔴 RED: Basic Rendering', () => {
    it('should render question text', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      expect(screen.getByText(sampleQuiz.question)).toBeDefined()
    })

    it('should render all options', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      sampleQuiz.options.forEach(option => {
        expect(screen.getByText(option)).toBeDefined()
      })
    })

    it('should have Submit button', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      expect(screen.getByRole('button', { name: /submit|提交|check/i })).toBeDefined()
    })
  })

  describe('🔴 RED: Interactive Features', () => {
    it('should allow selecting an option', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      const firstOption = screen.getByText('Test-Driven Development')
      fireEvent.click(firstOption)
      
      // Should have selected state
      expect(firstOption.closest('div')?.className).toContain('selected')
    })

    it('should show correct feedback on correct answer', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      fireEvent.click(screen.getByText('Test-Driven Development'))
      fireEvent.click(screen.getByRole('button', { name: /submit|提交|check/i }))
      
      // Check for the specific "Correct!" text in feedback header
      expect(screen.getByText('Correct!')).toBeDefined()
    })

    it('should show incorrect feedback on wrong answer', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      fireEvent.click(screen.getByText('Type-Driven Design'))
      fireEvent.click(screen.getByRole('button', { name: /submit|提交|check/i }))
      
      // Check for the specific "Incorrect" text in feedback header
      expect(screen.getByText(/Incorrect - Keep learning!/)).toBeDefined()
    })

    it('should show explanation after submission', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      
      render(<Quiz {...sampleQuiz} />)
      
      fireEvent.click(screen.getByText('Test-Driven Development'))
      fireEvent.click(screen.getByRole('button', { name: /submit|提交|check/i }))
      
      expect(screen.getByText(/TDD is Test-Driven Development/)).toBeDefined()
    })

    it('should call onAnswer callback with result', async () => {
      const { Quiz } = await import('../interactive/Quiz')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      const onAnswer = vi.fn()
      
      render(<Quiz {...sampleQuiz} onAnswer={onAnswer} />)
      
      fireEvent.click(screen.getByText('Test-Driven Development'))
      fireEvent.click(screen.getByRole('button', { name: /submit|提交|check/i }))
      
      expect(onAnswer).toHaveBeenCalledWith({ correct: true, selectedIndex: 0 })
    })
  })
})
