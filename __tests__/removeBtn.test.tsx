

// __tests__/RemoveBtn.test.tsx
import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // Ensure this is imported in your test setup
import { render, screen, fireEvent } from '@testing-library/react';
import RemoveBtn from '@/app/components/UI/removeBtn';
import { useRouter } from 'next/navigation';
import fetchMock from 'jest-fetch-mock';
// Mock next/navigation's useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('RemoveBtn Component', () => {
    let mockRouter: jest.Mock;

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
        mockRouter = useRouter as jest.Mock;
        fetchMock.resetMocks();
    });

    // test('renders the button with trash icon', () => {
    //     render(<RemoveBtn id="123" />);
    //     const buttonElement = screen.getByRole('button');
    //     expect(buttonElement).toBeInTheDocument();
    // });

    test('handles click and confirms deletion', async () => {
        // Mock window.confirm
        window.confirm = jest.fn().mockReturnValue(true);

        // Mock the fetch response
        fetchMock.mockResponseOnce(JSON.stringify({}));

        // Mock the router.refresh method
        const refresh = jest.fn();
        mockRouter.mockReturnValue({ refresh });

        render(<RemoveBtn id="123" />);
        const buttonElement = screen.getByRole('button');

        fireEvent.click(buttonElement);

        // Ensure fetch was called
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/posts?id=123', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        // Ensure router.refresh was called
        expect(refresh).toHaveBeenCalled();
    });

    test('handles API failure gracefully', async () => {
        // Mock window.confirm
        window.confirm = jest.fn().mockReturnValue(true);

        // Mock the fetch to fail
        fetchMock.mockRejectOnce(new Error('Failed to delete post'));

        // Mock console.error
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<RemoveBtn id="123" />);
        const buttonElement = screen.getByRole('button');

        fireEvent.click(buttonElement);

        // Ensure console.error was called
        expect(consoleError).toHaveBeenCalledWith('Failed to delete post:', expect.any(Error));

        consoleError.mockRestore();
    });

    test('does not call API when deletion is cancelled', async () => {
        // Mock window.confirm to return false
        window.confirm = jest.fn().mockReturnValue(false);

        render(<RemoveBtn id="123" />);
        const buttonElement = screen.getByRole('button');

        fireEvent.click(buttonElement);

        // Ensure fetch was not called
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
