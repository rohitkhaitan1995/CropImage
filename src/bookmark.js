import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    paper: {
        padding: theme.spacing.unit,
        margin: 'auto',
        maxWidth: 1200,
    },
    image: {
        width: 32,
        height: 32,
    },
    tagimage: {
        width: 64,
        height: 64,
    },
    controlimage: {
        width: 32,
        height: 32,
    },
    tagimg: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

class Bookmark extends Component {
    state = {
        list: [
            {
                bookmark_name: "Rohit",
                description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
                image: "http://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png",
                title: "Google",
                url: "http://www.google.com/",
            },
            {
                bookmark_name: "Rohit",
                description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
                image: "",
                title: "YouTube",
                url: "https://www.youtube.com/"
            },
            {
                bookmark_name: "Rohit",
                description: "Contains all examples of our Interactive & Dynamic Force-Directed Graphs with D3 blog post - ninjaconcept/d3-force-directed-graph",
                image: "https://avatars3.githubusercontent.com/u/200890?s=400&v=4",
                title: "ninjaconcept/d3-force-directed-graph",
                url: "https://github.com/ninjaconcept/d3-force-directed-graph/blob/master/example/2-relations.html",
            }, {
                bookmark_name: "Rohit",
                description: "Navigation drawers provide access to destinations in your app. Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen.",
                image: "https://material-ui.com/static/brand.png",
                title: "Drawer React component - Material-UI",
                url: "https://material-ui.com/demos/drawers/"
            }],
        url: '',
        bookmark_name: '',
        grid: 4,
    };

    componentDidMount() {
        
    }
    handleChange = event => {
        this.setState({ bookmark_name: event.target.value });
    };
    handleChange1 = event => {
        this.setState({ url: event.target.value });
    }

    fetchUrl = () => {
        axios.post(
            'https://api.linkpreview.net',
            {
                q: this.state.url,
                key: '5c834ec7e06841cfa81af29c6f2d8cacb44921722e753'
            }).then(res => {
                this.setState({
                    list: [...this.state.list,
                    { bookmark_name: this.state.bookmark_name, description: res.data.description, image: res.data.image, title: res.data.title, url: res.data.url }]
                });
                console.log(this.state.list);
            })
    }

    gridView = data => {
        if (this.state.grid === 12)
            this.setState({ grid: 4 });
        else
            this.setState({ grid: 12 });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div style={{ float: 'center' }}>
                    <InputBase
                        id="bootstrap-input"
                        placeholder="Name"
                        onChange={this.handleChange}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput,
                        }}
                    />
                    <InputBase
                        id="bootstrap-input"
                        placeholder="Url"
                        onChange={this.handleChange1}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput,
                        }}
                    />
                    <Button variant="contained" className={classes.button} onClick={this.fetchUrl}>
                        Save
                    </Button>
                </div>
                <div style={{ float: 'right' }}>
                    <div>
                        {this.state.grid === 4 && <img src="../asset/list.png" alt="" height="25" width="25" onClick={this.gridView} />}
                        {this.state.grid === 12 && <img src="../asset/grid.png" alt="" height="20" width="20" onClick={this.gridView} />}
                    </div>
                </div>
                <Grid container spacing={8}>
                    <Grid container item xs={12} spacing={8}>
                        {this.state.list.map((data) => {
                            return (
                                <React.Fragment>
                                    <Grid item xs={this.state.grid}>
                                        <Paper className={classes.paper}>
                                            <Grid container spacing={16}>
                                                <Grid item>
                                                    <ButtonBase className={classes.tagimage}>
                                                        <img className={classes.tagimg} alt="complex" src='../asset/bookmark.png' />
                                                    </ButtonBase>
                                                </Grid>
                                                <Grid item xs={12} sm container>
                                                    <Grid item xs container direction="column" spacing={16}>
                                                        <Grid item xs>
                                                            <Typography gutterBottom variant="subtitle1">
                                                                {data.bookmark_name}
                                                            </Typography>
                                                            <Typography gutterBottom><a href={data.url}>{data.url}</a></Typography>
                                                            <Typography color="textSecondary"><img className={classes.image} alt="complex" src={data.image} />
                                                            {data.title}</Typography>
                                                            <Typography gutterBottom>{data.description}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        {true && <img className={classes.controlimage} alt="complex" src='../asset/icons8-star-50.png' />}
                                                        {false && <img className={classes.controlimage} alt="complex" src='../asset/icons8-star-filled-48.png' />}
                                                        <img className={classes.controlimage} alt="complex" src='../asset/archive.png' />

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid >
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </Grid>
            </div >
        );
    }
}

Bookmark.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmark);