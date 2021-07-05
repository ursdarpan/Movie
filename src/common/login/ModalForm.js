import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Paper} from "material-ui";
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import LoginForm from "./LoginComp";
import RegisterForm from "./RegisterComp";

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

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
});

class BasicTabs extends React.Component {
    state = {
        activeTabIndex: 0,
    };

    handleChange = (event, value) => {
        this.setState({ activeTabIndex: value });
    };

    render() {
        const { classes } = this.props;
        const { activeTabIndex } = this.state;

        return (
            <div className={classes.root}>
                <Paper square>
                    <Tabs value={activeTabIndex} onChange={this.handleChange}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </Paper>
                {
                    activeTabIndex === 0 &&
                    // When the user clicks on Test One or Test Two, update the state
                    // to display Tab 2
                    <div onClick={() => this.setState({ activeTabIndex: 1 })}>
                        <TabContainer >
                            <LoginForm />
                        </TabContainer>
                    </div>
                }
                {
                    activeTabIndex === 1 &&
                    <div>
                        <TabContainer>
                            <RegisterForm />
                        </TabContainer>
                    </div>
                }
            </div>
        );
    }
}

BasicTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTabs);


