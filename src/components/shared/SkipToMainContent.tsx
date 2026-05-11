'use client';

import styled from 'styled-components';

const SkipLink = styled.a`
  position: absolute;
  left: 1rem;
  top: -100px;
  z-index: 10000;
  padding: 0.65rem 1rem;
  background: #111827;
  color: #f9fafb;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 0 0 0.375rem 0.375rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  transition: top 0.15s ease-out;

  &:focus {
    top: 0;
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export default function SkipToMainContent() {
  return (
    <SkipLink href="#main-content">К основному содержанию</SkipLink>
  );
}
