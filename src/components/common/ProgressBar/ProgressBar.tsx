import React from 'react';
import {ProgressBar} from 'primereact/progressbar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.css';

const ProgressBarDemo = () => {

    return (
        <div className="card">
            <ProgressBar mode="indeterminate" style={{height: '8px'}}></ProgressBar>
        </div>
    )
}
export default ProgressBarDemo