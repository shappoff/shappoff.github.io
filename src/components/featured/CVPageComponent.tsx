"use client"

import styled from "styled-components"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f9fafb;

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
  }
`

const CVWrapper = styled.div`
  width: 100%;
  max-width: 64rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  padding-top: 141.4%;

  @media (prefers-color-scheme: dark) {
    background-color: #374151;
  }
`

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 0;
  border-radius: 0.5rem;
  height: calc(400vh - 10px);
`

const DownloadButton = styled.button`
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: 1px solid transparent;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #4338ca;
  }

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #6366f1;
  }
`

const CVPageComponent = ({src}: any) => {
    return (
        <PageContainer>
            <CVWrapper>
                <StyledIframe src={src} title="My Curriculum Vitae" allowFullScreen></StyledIframe>
            </CVWrapper>
        </PageContainer>
    )
};

export default CVPageComponent;
