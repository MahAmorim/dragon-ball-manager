import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FormCep from './FormCep'
import { act } from "react-dom/test-utils";
import { Container } from "reactstrap";

global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => ({
            cep: '03047000',
            logradouro: 'Rua escorpião',
            bairro: 'Estrelas',
        })
    })
)

it('Deveria renderizar cep form', async () => {
    const { debug, getByPlaceholderText } = render(<FormCep />)

    const cepInput = getByPlaceholderText('CEP').closest('input')
    fireEvent.change(cepInput, { target: { value: '03047000' } })

    await act(() => global.fetch)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(Container).toMatchSnapshot()


    //debug()
})