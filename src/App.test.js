import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Permet d'utiliser les assertions DOM

import Citems from './Components/CItems/Citems';

// Mock de la contexte de votre application
jest.mock('../../Context/ShopContext', () => ({
    ShopContext: {
        Consumer: (props) => props.children({
            getTotalCartAmount: jest.fn().mockReturnValue(50), // Mock de la fonction getTotalCartAmount
            all_product: [
                { id: 1, name: 'Product 1', image: 'image1.jpg', new_price: 10 },
                { id: 2, name: 'Product 2', image: 'image2.jpg', new_price: 20 }
            ],
            cartItems: { 1: 2, 2: 1 }, // Mock des éléments du panier
            removeFromCart: jest.fn(),
        }),
    },
}));

describe('Citems Component', () => {
    test('renders cart items', () => {
        const { getByText } = render(<Citems />);
        
        expect(getByText('Products')).toBeInTheDocument();
        expect(getByText('Product 1')).toBeInTheDocument();
        expect(getByText('Product 2')).toBeInTheDocument();
    });

    test('removes item from cart', () => {
        const { getByAltText, getByText } = render(<Citems />);

        const removeIcon = getByAltText('remove'); // Trouve l'élément avec l'attribut alt "remove"
        fireEvent.click(removeIcon); // Simule un clic sur l'icône de suppression

        expect(getByText('Product 1')).not.toBeInTheDocument(); // Vérifie que le produit a été supprimé
    });

    test('proceeds to checkout', async () => {
        const { getByText, getByLabelText } = render(<Citems />);

        const proceedToCheckoutButton = getByText('PROCEED TO CHECKOUT');
        fireEvent.click(proceedToCheckoutButton); // Simule un clic sur le bouton "PROCEED TO CHECKOUT"

        // Vérifie que le formulaire de paiement est affiché après le clic sur le bouton
        expect(getByText('Payment Details')).toBeInTheDocument();

        // Remplir le formulaire de paiement
        fireEvent.change(getByLabelText('Card Number'), { target: { value: '1234 5678 9012 3456' } });
        fireEvent.change(getByLabelText('Card Holder Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Expiry Date'), { target: { value: '12/24' } });
        fireEvent.change(getByLabelText('CVV'), { target: { value: '123' } });

        // Vérifie que les champs du formulaire sont correctement remplis
        expect(getByLabelText('Card Number')).toHaveValue('1234 5678 9012 3456');
        expect(getByLabelText('Card Holder Name')).toHaveValue('John Doe');
        expect(getByLabelText('Expiry Date')).toHaveValue('12/24');
        expect(getByLabelText('CVV')).toHaveValue('123');

        // Simuler le retour au panier
        fireEvent.click(getByText('Back to Cart'));

        // Vérifier que nous sommes revenus à la vue du panier
        expect(getByText('Products')).toBeInTheDocument();
    });
});
