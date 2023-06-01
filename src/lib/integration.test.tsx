import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Components to test
import { Table } from '.';
import InputEntries from './Table/InputEntries';

// Mock data : 26 items
import { users } from '../mock/data';

// Mock data : minimal set of 3 items
const items = [
  { firstName: 'Alice', age: 55 },
  { firstName: 'Zoé', age: 18 },
  { firstName: 'Rodolf', age: 35 },
];

const headers = [
  { label: 'Name', name: 'firstName' },
  { label: 'Age', name: 'age' },
];

// Test suite
describe('Table component | integration tests', () => {
  describe('When rendered with no data', () => {
    it('Should render an error message "no items available"', () => {
      // Arrange
      render(<Table headers={headers} items={[]} />);
      // Assert
      expect(screen.getByText('No items available.')).toBeInTheDocument();
    });
  });

  describe('When rendered with initial data', () => {
    beforeEach(() => {
      // Arrange
      render(<Table headers={headers} items={items} />);
    });

    it('Should render table headers correctly', () => {
      // Assert
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('Should render table items correctly', () => {
      // Assert
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('55')).toBeInTheDocument();
      expect(screen.getByText('Zoé')).toBeInTheDocument();
      expect(screen.getByText('18')).toBeInTheDocument();
      expect(screen.getByText('Rodolf')).toBeInTheDocument();
      expect(screen.getByText('35')).toBeInTheDocument();
    });

    it('Should display correct pagination information', () => {
      // Assert
      expect(
        screen.getByText('Showing 1 to 3 of 3 entries')
      ).toBeInTheDocument();
    });
  });

  describe('When rendered with initial data and sort order', () => {
    it('Should render the age in correct order', () => {
      // Arrange
      render(<Table headers={headers} items={items} sortBy="age" />);

      const tableRows = screen.getAllByRole('row'); // Get all <tr> elements
      const ages = tableRows
        .slice(1) // skip the header row
        .map((row) => row.children[1].textContent); // extract the second child, the age

      // Assert
      expect(ages).toEqual(['18', '35', '55']);
    });

    it('Should render the first names in correct order', () => {
      // Arrange
      render(<Table headers={headers} items={items} sortBy="firstName" />);

      const tableRows = screen.getAllByRole('row'); // all <tr>
      const names = tableRows
        .slice(1) // skip the header
        .map((row) => row.children[0].textContent); // extract the firstName

      // Assert
      expect(names).toEqual(['Alice', 'Rodolf', 'Zoé']);
    });
  });

  describe('When a search term is entered', () => {
    beforeEach(() => {
      render(<Table headers={headers} items={items} />);
    });

    it('Should display a warning message when there are no results', () => {
      // Act
      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'Adam' } });

      // Assert
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });

    it('Should filter items based on the search term', () => {
      // Act
      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'Rodolf' } });

      // Assert
      expect(screen.getByText('Rodolf')).toBeInTheDocument();
      expect(screen.getByText('35')).toBeInTheDocument();
    });

    it('Should update pagination information', () => {
      // Act
      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'Rodolf' } });
      // Assert
      expect(
        screen.getByText('Showing 1 to 1 of 1 entries')
      ).toBeInTheDocument();
    });
  });

  describe('When a column header is clicked for sorting', () => {
    beforeEach(() => {
      render(<Table headers={headers} items={items} />);
    });

    it('Should sort items based on the age', () => {
      // Act
      const ageHeader = screen.getByText('Age');
      fireEvent.click(ageHeader);

      const tableRows = screen.getAllByRole('row');
      const names = tableRows
        .slice(1)
        .map((row) => row.children[0].textContent);
      const ages = tableRows.slice(1).map((row) => row.children[1].textContent);

      // Assert
      expect(names).toEqual(['Zoé', 'Rodolf', 'Alice']);
      expect(ages).toEqual(['18', '35', '55']);
    });

    it('Should sort items based on the names', () => {
      // Act
      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader);

      const tableRows = screen.getAllByRole('row');
      const names = tableRows
        .slice(1)
        .map((row) => row.children[0].textContent);
      const ages = tableRows.slice(1).map((row) => row.children[1].textContent);

      // Assert
      expect(names).toEqual(['Alice', 'Rodolf', 'Zoé']);
      expect(ages).toEqual(['55', '35', '18']);
    });

    it('Should display the three different sort icons', () => {
      const nameHeader = screen.getByText('Name');
      expect(nameHeader.textContent).toEqual('Name▼▲');

      // Act
      fireEvent.click(nameHeader);
      expect(nameHeader.textContent).toEqual('Name▲');

      // Act
      fireEvent.click(nameHeader);
      expect(nameHeader.textContent).toEqual('Name▼');
    });
  });

  describe('When the user select a number of entries', () => {
    it('Should display the right default settings', () => {
      // Arrange
      render(<Table headers={headers} items={users} />);
      const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
      const selectedOption = selectElement.options[selectElement.selectedIndex];

      // Assert
      expect(screen.getAllByRole('option').length).toBe(4);
      expect(selectedOption.textContent).toBe('10');
    });

    it('Should call the onChange callback with the selected length', () => {
      // Arrange
      const onChangeMock = vi.fn();
      render(<InputEntries onChange={onChangeMock} />);
      const selectElement = screen.getByRole('combobox');

      // Act
      fireEvent.change(selectElement, { target: { value: '25' } });

      // Assert
      expect(onChangeMock).toHaveBeenCalledWith(25);
    });

    it('Should display the right number of items', () => {
      // Arrange
      render(<Table headers={headers} items={users} />);
      const selectElement = screen.getByRole('combobox');

      // Act
      fireEvent.change(selectElement, { target: { value: '10' } });
      const displayedItems = screen.getAllByRole('row');

      // Assert
      expect(displayedItems.length).toBe(11); // Add one row for headers
    });

    it('Should update pagination information', () => {
      // Arrange
      render(<Table headers={headers} items={users} />);
      const selectElement = screen.getByRole('combobox');

      // Act
      fireEvent.change(selectElement, { target: { value: '10' } });

      // Assert
      expect(
        screen.getByText('Showing 1 to 10 of 26 entries')
      ).toBeInTheDocument();
    });
  });

  describe('When rendered with pagination', () => {
    it('Should display the pagination buttons', () => {
      // Arrange
      render(<Table headers={headers} items={users} />);

      // Assert
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('Should display the correct number of buttons', () => {
      // Arrange
      render(<Table headers={headers} items={users} />);

      // Assert
      const paginationButtons = screen.getByRole('navigation');
      const buttons = paginationButtons.querySelectorAll('button');
      // 26 items . nbEntries (10) = 3 pages
      // + Previous/Next button = 5 buttons
      expect(buttons.length).toBe(5);
    });

    describe('And when the number of entries change', () => {
      it('Should display the correct number of buttons', () => {
        // Arrange
        render(<Table headers={headers} items={users} />);
        const selectElement = screen.getByRole('combobox');

        // Act
        fireEvent.change(selectElement, { target: { value: '25' } });

        // Assert
        const paginationButtons = screen.getByRole('navigation');
        const buttons = paginationButtons.querySelectorAll('button');
        // 26 items / 25 entries = 2 pages
        // + Previous/Next button = 4 buttons
        expect(buttons.length).toBe(4);
      });
    });

    describe('And when pagination button is clicked', () => {
      it('Should update the current aria attribute', () => {
        // Arrange
        render(<Table headers={headers} items={users} />);
        const paginationButtons = screen.getByRole('navigation');

        fireEvent.click(
          paginationButtons.querySelector('button:nth-child(3)')! // First button is "Previous"
        );

        // Assert
        const selectedPageButton = screen.getByRole('button', { name: /2/i });
        expect(selectedPageButton).toHaveAttribute('aria-current', 'true');
      });

      it('Should display correct pagination information', () => {
        // Arrange
        render(<Table headers={headers} items={users} />);
        const paginationButtons = screen.getByRole('navigation');

        fireEvent.click(
          paginationButtons.querySelector('button:nth-child(3)')! // First button is "Previous"
        );

        // Assert
        expect(
          screen.getByText('Showing 11 to 20 of 26 entries') // Second page
        ).toBeInTheDocument();
      });
    });
  });
});
