import React, {Component} from 'react';
import {ListItem,
    ListItemText, Drawer,
    List} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/icon';

const classes = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});



export default class LeftDrawer extends Component {

    constructor(props) {
        super(props);

        this.listToDrawerList = this.listToDrawerList.bind(this);

        this.state = {
            left: false,
            drawerList: ["My Profile", "My Rides History"]
        }
    }

    listToDrawerList() {
        return this.state.drawerList.map((text, index) => {
            return (<ListItem button key={text} onClick={() => {
                if(index === 0)
                    this.props.onMyProfileClick();
                else
                    this.props.onMyRidesHistoryClick();
            }}>
                <ListItemText primary={text}/>
            </ListItem>);
        });
    }

    render() {

        const toggleDrawer = (side, open) => event => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({ ...this.state, left: open });
        };

        const sideList = side => (
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
            >
                <List>
                    {this.listToDrawerList()}
                </List>
            </div>
        );


        return (
            <div>
                <div className="bg-white w-50 rounded">
                    <Icon className="align-self-center mt-1" style={{"color" : "grey"}} onClick={toggleDrawer('left', true)} >reorder</Icon>
                </div>
                <Drawer open={this.state.left} onClose={toggleDrawer('left', false)}>
                    {sideList('left')}
                </Drawer>
            </div>
        );
    }
}