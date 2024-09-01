import React from 'react';
import  GovernanceIcon from '../../assets/Governance_icon.png';
import './Esg.css'
function ESGComponent() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={GovernanceIcon} alt="ESG" style={{ maxWidth: '100%', borderRadius: '10px' }} />
            <div>
                <h2>ESG in investing</h2>
                <p>Today's investors leverage ESG criteria not just for ethical reasons but also to inform their decisions and risk assessments. Beyond mere financial metrics, ESG provides a holistic view of a company's resilience, adaptability, and future potential.</p>
            </div>
        </div>
    );
}

export default ESGComponent;
