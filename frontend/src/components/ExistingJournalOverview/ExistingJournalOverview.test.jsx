import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExistingJournalOverview from './ExistingJournalOverview';

describe('ExistingJournalOverview', () => {
 it('renders the component', () => {
    render(
      <MemoryRouter>
        <ExistingJournalOverview />
      </MemoryRouter>,
    );

    const headingElement = screen.getByText('Welcome To Journal');
    expect(headingElement).toBeInTheDocument();

    const subheadingElement = screen.getByText('See Your Past Journal Entries');
    expect(subheadingElement).toBeInTheDocument();

 });
});
