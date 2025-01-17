import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide(params) {
    const classes = useStyles();


    const [value, setValue] = React.useState({
        role: 'rider',
        email: '',
        password: ''
    });

    const submitLogin = (e) => {
        e.preventDefault();
        params.onLogin(value);
    };

    function handleChange(event) {
        const roleVal = event.target.value;
        setValue(prevState =>{
            return {...prevState, role: roleVal};
        });
    }

    function handleEmailChange(event) {
        const emailVal = event.target.value;
        setValue(prevState =>{
            return {...prevState, email: emailVal};
        });
    }

    function handlePasswordChange(event) {
        const passVal = event.target.value;
        setValue(prevState =>{
            return {...prevState, password: passVal};
        });
    }

    const handleRedirectToSignUp = (e) => {
        params.onRedirectToSignUp();
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => submitLogin(e)} noValidate>
                        {/*Choose to be rider, driver or admin*/}
                        <FormControl component="fieldset">
                            <FormLabel component="legend">as</FormLabel>
                            <RadioGroup aria-label="position" name="position" value={value.role} onChange={handleChange} row>
                                <FormControlLabel
                                    value="rider"
                                    control={<Radio color="primary" />}
                                    label="Rider"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="driver"
                                    control={<Radio color="primary" />}
                                    label="Driver"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="admin"
                                    control={<Radio color="primary" />}
                                    label="Admin"
                                    labelPlacement="top"
                                />
                            </RadioGroup>
                        </FormControl>

                        {/*Input fields*/}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={() => params.onPassReset(value)}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={handleRedirectToSignUp}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Built with love by Mazen and Bassant'}
                            </Typography>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}