import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const dropdownClasses = cva(
  'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      size: {
        small: 'text-xs px-2 py-1',
        medium: 'text-sm px-3 py-2',
        large: 'text-base px-4 py-3',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const Dropdown = ({
  // Required parameters with defaults
  placeholder = "Week",
  text_font_size = "12px",
  text_font_family = "Plus Jakarta Sans",
  text_font_weight = "400",
  text_line_height = "16px",
  text_text_align = "center",
  text_color = "#000000",
  border_border = "1px solid #000000",
  border_border_radius = "14px",
  
  // Optional parameters (no defaults)
  layout_align_self,
  layout_gap,
  layout_width,
  padding,
  position,
  
  // Additional props
  options = [],
  value,
  onChange,
  disabled = false,
  size,
  className,
  dropdownIcon = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || placeholder);
  const dropdownRef = useRef(null);

  // Safe validation for optional parameters
  const hasValidAlignSelf = layout_align_self && typeof layout_align_self === 'string' && layout_align_self?.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidAlignSelf ? `self-${layout_align_self}` : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidWidth ? (layout_width === 'auto' ? 'w-auto' : layout_width === 'full' ? 'w-full' : `w-[${layout_width}]`) : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  // Parse border string
  const parseBorder = (borderStr) => {
    if (!borderStr) return {};
    const parts = borderStr?.split(' ');
    return {
      borderWidth: parts?.[0] || '1px',
      borderStyle: parts?.[1] || 'solid',
      borderColor: parts?.[2] || '#000000',
    };
  };

  const borderStyles = parseBorder(border_border);

  // Build button styles
  const buttonStyles = {
    fontSize: text_font_size || '12px',
    fontFamily: text_font_family || 'Plus Jakarta Sans',
    fontWeight: text_font_weight || '400',
    lineHeight: text_line_height || '16px',
    textAlign: text_text_align || 'center',
    color: text_color || '#000000',
    border: `${borderStyles?.borderWidth} ${borderStyles?.borderStyle} ${borderStyles?.borderColor}`,
    borderRadius: border_border_radius || '14px',
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    setSelectedValue(option?.label || option);
    setIsOpen(false);
    
    if (typeof onChange === 'function') {
      onChange(option?.value || option);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={twMerge('relative', optionalClasses)}
      {...props}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        style={buttonStyles}
        className={twMerge(
          dropdownClasses({ size }),
          'min-w-[80px]',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex-1">{selectedValue}</span>
        {dropdownIcon && (
          <svg
            className={twMerge(
              'ml-2 w-4 h-4 transition-transform duration-200',
              isOpen ? 'transform rotate-180' : ''
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {isOpen && options?.length > 0 && (
        <ul
          role="listbox"
          className={twMerge(
            'absolute z-50 mt-2 w-full bg-white border border-gray-200 shadow-lg overflow-auto max-h-60',
            'animate-fade-in'
          )}
          style={{
            borderRadius: border_border_radius || '14px',
          }}
        >
          {options?.map((option, index) => {
            const optionValue = typeof option === 'object' ? option?.value : option;
            const optionLabel = typeof option === 'object' ? option?.label : option;

            return (
              <li
                key={index}
                role="option"
                aria-selected={selectedValue === optionLabel}
                onClick={() => handleSelect(option)}
                className={twMerge(
                  'px-4 py-2 cursor-pointer transition-colors duration-150',
                  'hover:bg-gray-100 active:bg-gray-200',
                  selectedValue === optionLabel ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-800'
                )}
                style={{
                  fontSize: text_font_size || '12px',
                  fontFamily: text_font_family || 'Plus Jakarta Sans',
                }}
              >
                {optionLabel}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;