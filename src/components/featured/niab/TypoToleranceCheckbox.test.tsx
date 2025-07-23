import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypoToleranceCheckbox from './TypoToleranceCheckbox';

describe('TypoToleranceCheckbox', () => {
  it('renders with correct label and classes', () => {
    const { container } = render(<TypoToleranceCheckbox isTypoTolerance={false} setIsTypoTolerance={() => {}} />);
    const label = screen.getByText('Точное совпадение');
    expect(label).toBeInTheDocument();
    // Check label classes
    expect(label).toHaveClass('form-check-label');
    // Check FormControlLabel classes
    const formControlLabel = label.closest('.typo-tolerance-checkbox-label');
    expect(formControlLabel).toBeInTheDocument();
    expect(formControlLabel).toHaveClass('form-control-label-ff', 'form-check-label-ff');
    // Check Switch custom class exists in the DOM
    const switchWithCustomClass = container.querySelector('.typo-tolerance-checkbox');
    expect(switchWithCustomClass).toBeInTheDocument();
    // It should contain a checkbox input
    const switchInput = screen.getByRole('checkbox');
    expect(switchWithCustomClass?.contains(switchInput)).toBe(true);
  });

  it('checked state reflects isTypoTolerance prop', () => {
    // When isTypoTolerance is false, checked should be true
    const { rerender } = render(<TypoToleranceCheckbox isTypoTolerance={false} setIsTypoTolerance={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    // When isTypoTolerance is true, checked should be false
    rerender(<TypoToleranceCheckbox isTypoTolerance={true} setIsTypoTolerance={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls setIsTypoTolerance with toggled value on change', () => {
    const setIsTypoTolerance = jest.fn();
    render(<TypoToleranceCheckbox isTypoTolerance={false} setIsTypoTolerance={setIsTypoTolerance} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(setIsTypoTolerance).toHaveBeenCalledWith(true);
  });
}); 