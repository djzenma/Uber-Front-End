import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";


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

export default function SignUp(params) {
    const classes = useStyles();

    const [value, setValue] = React.useState({
        role: 'rider',
        email: '',
        password: '',
        name: '',
        bdate: ''
    });

    const submitSignUp = (e) => {
        e.preventDefault();
        params.onSignUp(value);
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

    function handleFnameChange(event) {
        const fnameVal = event.target.value;
        setValue(prevState =>{
            return {...prevState, name: fnameVal};
        });
    }

    function handleLnameChange(event) {
        const lnameVal = event.target.value;
        setValue(prevState =>{
            return {...prevState, bdate: lnameVal};
        });
    }

    const handleRedirectToSignIn = (e) => {
        params.onRedirectToSignIn();
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
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => submitSignUp(e)}>
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
                            </RadioGroup>
                        </FormControl>

                        {/*Input fields*/}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={handleFnameChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="bdate"
                                    label="Birth Date"
                                    name="birthDate"
                                    autoComplete="yyyy-mm-dd"
                                    onChange={handleLnameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={handleRedirectToSignIn}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Built with love by the '}
                            </Typography>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}