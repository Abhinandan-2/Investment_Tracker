import React from 'react';
import { Card } from 'react-bootstrap';
import ESGCards from './featurecards';
import ESGHeader from './esgheader';
import ESGComponent from './esgcomponent';
import EsgBusinessImperative from './esgbusiness';
import EsgEvolution from './esgevolution';
import EsgConclusion from './esgconclusion';
import { Navbar,Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import NavBar from '../NavBar/NavBar';

import './Esg.css'
export default function ESG() {
    return (
        <>




<NavBar heding="ESG Education"/>


        <div className="body">
            <div className="esg-container">
                <h1>Understanding ESG</h1>
                <p>Environmental, Social, and Governance (ESG) criteria are now central to investment decisions. Beyond ethics, ESG factors impact a company's longevity, reputation, and financial health. This page guides investors through the essentials of ESG and its influence on stock investments.</p>
            </div>
<div className="card-container">
<ESGHeader />


            

</div>

<div className="card-container"><ESGCards />  </div>



<ESGComponent />

<div className="card-container"><EsgBusinessImperative/></div>
<EsgEvolution/>
<EsgConclusion/>
 
        </div>
        </>
    );
}
