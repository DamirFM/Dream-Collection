// JoinPage.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinPage from '../app/join/page';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';

// Mock the useRouter and getServerSession functions
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next-auth', () => ({
    getServerSession: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn();

const mockRouter = {
    push: jest.fn(),
};

beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

test('renders JoinPage and handles form submission', async () => {
    // Mock server-side session check to always return null
    (getServerSession as jest.Mock).mockResolvedValue(null);

    // Mock fetch responses
    (fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/api/userExists')) {
            return Promise.resolve({
                json: () => Promise.resolve({ user: null }), // Simulate user not existing
            });
        }
        if (url.includes('/api/user')) {
            return Promise.resolve({ ok: true }); // Simulate successful user creation
        }
        return Promise.reject('Unknown API');
    });

    render(<JoinPage />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText('Join'));

    // Wait for the router to push
    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/profile'));

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledWith('/api/userExists', expect.any(Object));
    expect(fetch).toHaveBeenCalledWith('/api/user', expect.any(Object));
});

test('displays validation errors for empty fields', async () => {
    // Mock server-side session check to always return null
    (getServerSession as jest.Mock).mockResolvedValue(null);

    render(<JoinPage />);

    // Submit the form without filling out fields
    fireEvent.click(screen.getByText('Join'));

    // Check for validation error messages
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
});

test('handles user already exists error', async () => {
    // Mock server-side session check to always return null
    (getServerSession as jest.Mock).mockResolvedValue(null);

    // Mock fetch responses
    (fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/api/userExists')) {
            return Promise.resolve({
                json: () => Promise.resolve({ user: { email: 'jane@example.com' } }), // Simulate user existing
            });
        }
        return Promise.reject('Unknown API');
    });

    render(<JoinPage />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText('Join'));

    // Check for user already exists error
    expect(await screen.findByText('User already exists')).toBeInTheDocument();
});