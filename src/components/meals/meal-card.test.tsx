import { render, screen } from '@testing-library/react';
import MealCard from './meal-card';

describe('MealCard', () => {
    const defaultProps = {
        name: 'Test Recipe',
        url: 'https://example.com/recipe',
        image: 'https://example.com/image.jpg',
        ingredients: ['ingredient1', 'ingredient2', 'ingredient3']
    };

    it('renders meal name', () => {
        render(<MealCard {...defaultProps} />);
        expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });

    it('renders recipe link with correct href', () => {
        render(<MealCard {...defaultProps} />);
        const link = screen.getByText('Go to Recipe →');
        expect(link).toHaveAttribute('href', 'https://example.com/recipe');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders image when provided', () => {
        render(<MealCard {...defaultProps} />);
        const image = screen.getByAltText('Test Recipe recipe');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('does not render image when not provided', () => {
        const { image, ...propsWithoutImage } = defaultProps;
        render(<MealCard {...propsWithoutImage} />);
        expect(screen.queryByAltText('Test Recipe recipe')).not.toBeInTheDocument();
    });

    it('renders ingredients when provided', () => {
        render(<MealCard {...defaultProps} />);
        expect(screen.getByText('Ingredients:')).toBeInTheDocument();
        expect(screen.getByText('ingredient1')).toBeInTheDocument();
        expect(screen.getByText('ingredient2')).toBeInTheDocument();
        expect(screen.getByText('ingredient3')).toBeInTheDocument();
    });

    it('does not render ingredients section when not provided', () => {
        const { ingredients, ...propsWithoutIngredients } = defaultProps;
        render(<MealCard {...propsWithoutIngredients} />);
        expect(screen.queryByText('Ingredients:')).not.toBeInTheDocument();
    });

    it('renders without ingredients when empty array', () => {
        render(<MealCard {...defaultProps} ingredients={[]} />);
        expect(screen.queryByText('Ingredients:')).not.toBeInTheDocument();
    });
});
