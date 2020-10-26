import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
    return (
        <CFooter fixed={false}>
            <div>
                <a href="https://eplacowka.pl" target="_blank" rel="noopener noreferrer">
                    Inspekcje
                </a>
                <span className="ml-1">&copy; 2020</span>
            </div>
            <div className="mfs-auto">
                <span className="mr-1">Wersja: 1.0</span>
            </div>
        </CFooter>
    );
};

export default React.memo(TheFooter);
