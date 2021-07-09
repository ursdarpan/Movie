/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginComp';
import RegisterForm from './RegisterComp';

function TabContainer(props) {
  return (
    <Typography {...props} component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function BasicTabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChange = (event, value) => {
    setActiveTabIndex(value);
  };

  // const { classes } = this.props;

  return (
    <div className="root">
      <Paper square>
        <Tabs value={activeTabIndex} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Paper>
      {
                    activeTabIndex === 0
                    // When the user clicks on Test One or Test Two, update the state
                    // to display Tab 2
                    && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div onClick={() => setActiveTabIndex(1)}>
                      <TabContainer>
                        <LoginForm />
                      </TabContainer>
                    </div>
                    )
                }
      {
                    activeTabIndex === 1
                    && (
                    <div>
                      <TabContainer>
                        <RegisterForm />
                      </TabContainer>
                    </div>
                    )
                }
    </div>
  );
}

// BasicTabs.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
