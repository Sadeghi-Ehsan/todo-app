import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import {QueryClient, QueryClientProvider} from "react-query";
import userEvent from "@testing-library/user-event";

describe('Home', () => {
    const queryClient = new QueryClient();
    it('renders a heading', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
                )
        const button = screen.getByRole('heading', {name: /isLoading.../i})
        expect(button).toBeInTheDocument()
    })

    it('renders button for add task', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
                )
        const button = screen.getByRole('button', {name: /Add a task/i})
        expect(button).toBeInTheDocument()
    })

    it('renders a button for clearing tasks', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
                )
        const button = screen.getByRole('button', {name: /Clear tasks/i})
        expect(button).toBeInTheDocument()
    })
    describe('when task name is provided', () => {
        it('should enable the submit button and add the mentioned task!', () => {
            const input = screen.getByLabelText('task-input')
            userEvent.type(input, 'sample task')
            expect(screen.getByRole('button', { name: /Add a task/i })).toBeEnabled()
        })
    })
})