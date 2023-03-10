import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Action from './Action'
import { act } from "react-dom/test-utils";

//mocks
import { profile } from '../../mocks/profile.json';
import profileSuccess from '../../mocks/profileSuccess.json';

it('Deve renderizar Action', () => {
  const { container, debug, getByText } = render(<Action balls={profile.balls} />)
  const button = getByText('Invocar').closest('button')

  expect(getByText('Invocar shenlong')).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

it('Deve abrir modal se o user não tiver todas as dragon balls', () => {
  const { debug, getByText } = render(<Action balls={profile.balls} />)
  const button = getByText('Invocar').closest('button')

  fireEvent.click(button)
  expect(getByText('Você não tem todas as esferas para invocar o shenlong')).toBeInTheDocument()

  const backButton = getByText('Voltar').closest('button')
  fireEvent.click(backButton)

  expect(getByText('Invocar shenlong')).toBeInTheDocument()
})

it('Deve exibir shenlong', () => {
  const { container, debug, getByText, getByTestId } = render(<Action balls={profileSuccess.profile.balls} />)
  const button = getByText('Invocar').closest('button')

  fireEvent.click(button)
  expect(getByTestId('shenlong')).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})


