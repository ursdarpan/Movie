import React, {Fragment, useEffect, useState} from 'react';
import './Header.css';

const Header = function (props) {
    const {city,region,country_name}=locationDetail;
    return (
        <Fragment>
            <div className="header">
                {props.heading}
            </div>
        </Fragment>
    )
}

export default Header;
