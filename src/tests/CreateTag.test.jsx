import React from 'react';
import { render, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import TagList from '../components/Project/Tags/Tags';

afterEach(cleanup);

describe('Create Tag Form', () => {
    it('renders Create Tag Form', () => {
        const asFragment  = render(<LabelList />);
        expect(asFragment).toMatchSnapshot();
    });
});