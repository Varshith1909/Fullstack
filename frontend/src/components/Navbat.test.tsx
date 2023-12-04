import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');

describe('NavBar Component', () => {

  it('renders the navbar correctly', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText('pharmacy management')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('Suppliers')).toBeInTheDocument();
  });

  it('shows the login button when not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows the logout button when authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});