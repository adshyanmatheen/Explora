import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateNewJournalOverview from './CreateNewJournalOverview';

describe('CreateNewJournalOverview', () => {
 it('renders the component', () => {
    render(
      <MemoryRouter>
        <CreateNewJournalOverview />
      </MemoryRouter>,
    );

    const headingElement = screen.getByText('Welcome To Journal');
    expect(headingElement).toBeInTheDocument();
 });
});
