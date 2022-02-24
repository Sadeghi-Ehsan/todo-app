import {fireEvent, render, screen} from '@testing-library/react'
import Home from '../pages/index'
import {QueryClient, QueryClientProvider} from "react-query";

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
})
const setup = () => {
    const queryClient = new QueryClient();
    const utils = render(<QueryClientProvider client={queryClient}>
        <Home />
    </QueryClientProvider>)
    const input = utils.getByLabelText('task-input')
    return {
        input,
        ...utils,
    }
}
test('when task name is provided,should enable the submit button and add the mentioned task!', () => {
    const {input} = setup()
    fireEvent.change(input, {target: {value: 'sampleTaskName'}})
    expect(input.value).toBe('sampleTaskName')



})