import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CertificationInput from '../../../pages/components/Form/Certification/CertificationInput';

describe('Certification Input', () => {
    test('Initial Render', () => {
        const { container } = render(<CertificationInput />);
    
        const title = container.querySelector(".title");
        const certificationList = screen.queryByRole('list');
        const addCertificationBtn = screen.getByRole('button', {name: /Add Certification/});
        
        expect(title).toHaveTextContent('Certifications');
        expect(certificationList).not.toBeInTheDocument();
        expect(addCertificationBtn).toBeInTheDocument();
    })

    test('Add Certification Dialog', () => {
        render(<CertificationInput />);

        const addCertificationBtn = screen.getByRole('button', {name: /Add Certification/});
        fireEvent.click(addCertificationBtn);

        const dialog = screen.getByRole('dialog');
        const certificationName = screen.getByLabelText('Name:');
        const certificationEmitter = screen.getByLabelText('Emitter:');
        const certificationDate = screen.getByLabelText('Date:');
        const validateCertification = screen.getByRole('button', {name: /Submit/});
        const dismissInput = screen.getByRole('button', {name: /Dismiss/});


        expect(dialog).toBeInTheDocument();
        expect(certificationName).toBeInTheDocument();
        expect(certificationEmitter).toBeInTheDocument();
        expect(certificationDate).toBeInTheDocument();
        expect(validateCertification).toBeInTheDocument();
        expect(dismissInput).toBeInTheDocument();
    })

    test('User Certification Input On Screen', () => {
        const mockAddCertification = jest.fn();
        render(<CertificationInput addCertification={mockAddCertification} />);

        const addCertificationBtn = screen.getByRole('button', {name: /Add Certification/});
        fireEvent.click(addCertificationBtn);

        const certificationName = screen.getByLabelText('Name:');
        const certificationEmitter = screen.getByLabelText('Emitter:');
        const certificationDate = screen.getByLabelText('Date:');
        const validateCertification = screen.getByRole('button', {name: /Submit/});

        fireEvent.change(certificationName, {target: {value: 'Advanced Word 2007'}});
        fireEvent.change(certificationEmitter, {target: {value: 'Microsoft'}});
        fireEvent.change(certificationDate, {target: {value: '2024-08-09'}});

        fireEvent.click(validateCertification);

        const newCertificationOnScreen = screen.getByText("Advanced Word 2007 - Microsoft - 2024-08-09");
        
        expect(newCertificationOnScreen).toBeInTheDocument();
        expect(mockAddCertification).toHaveBeenCalledWith({
            certificationName: 'Advanced Word 2007',
            certificationEmitter: 'Microsoft',
            certificationDate: '2024-08-09',
        });        
    })
});
