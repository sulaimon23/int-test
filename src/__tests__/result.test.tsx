import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ResultPage from '../pages/result.page';

import { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ResultPage Component', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            data: [
                { id: 1, author: 'Author Name', title: 'Post Title', body: 'example body' },
                { id: 2, author: 'Another Author', title: 'Another Post', body: 'another body' },
            ],
        } as AxiosResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the ResultPage component', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <ResultPage />
                </BrowserRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByTestId('result-page')).toBeInTheDocument();
        });
    });

    it('renders the ResultPage component with loading state', async () => {
        mockedAxios.get.mockImplementation(() => new Promise(() => { }));

        await act(async () => {
            render(
                <BrowserRouter>
                    <ResultPage />
                </BrowserRouter>
            );
        });

        expect(screen.getByTestId('loader')).toBeInTheDocument();

        mockedAxios.get.mockResolvedValue({
            data: [
                { id: 1, author: 'Author Name', title: 'Post Title', body: 'example body' },
                { id: 2, author: 'Another Author', title: 'Another Post', body: 'another body' },
            ],
        } as AxiosResponse);
    });

    it('renders search results based on input', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <ResultPage />
                </BrowserRouter>
            );
        });

        await waitFor(() => screen.getByTestId('result-page'));

        const searchInput = screen.getByPlaceholderText('Author name, title...');
        const searchButton = screen.getByText('Search');

        userEvent.type(searchInput, 'example');
        userEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.queryByText('No data found')).not.toBeInTheDocument();
        });

        const postCards = await screen.findAllByTestId('post-card');
        expect(postCards.length).toBeGreaterThan(0);

        expect(postCards[0]).toHaveTextContent(/Author Name/i);
    });
});
