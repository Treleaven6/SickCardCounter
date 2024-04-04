import React from 'react'

import Button from '@mui/material/Button';
import { Grid, Typography, Slider } from '@mui/material';
import { makeStyles } from '@mui/styles';

// import Button from '@material-ui/core/Button'
// import { Grid, Typography, Slider } from '@material-ui/core'
// import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    centered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smol: {
        textAlign: 'center',
        maxWidth: '60%',
        marginTop: '4em',
        marginBottom: '4em'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topSpace: {
        marginTop: '1em'
    },
    spaceAndCenter: {
        marginTop: '1em',
        textAlign: 'center'
    },
    addButtons: {
        width: '100%',
        marginTop: '0.5em',
    },
    buttonText: {
        fontSize: '2em',
        textAlign: 'center'
    },
    bottomButtons: {
        minWidth: '10em'
    }
});

export default function() {

    const [totalCardCount, setTotalCardCount] = React.useState(0)
    const [runningCount, setRunningCount] = React.useState(0)
    const [trueCount, setTrueCount] = React.useState(0)
    const [deckCount, setDeckCount] = React.useState(6)
    const [useZeroes, setUseZeroes] = React.useState(false)
    const classes = useStyles();

    const CARDS_IN_A_DECK = 52

    const reset = () => {
        setTotalCardCount(0)
        setRunningCount(0)
        setTrueCount(0)
    }

    const addCard = value => {
        setTotalCardCount(totalCardCount + 1)
        setRunningCount(runningCount + value)
        updateTrueCount(totalCardCount + 1, runningCount + value)
    }

    const updateTrueCount = (newCardCount, newRunningCount) => {
        // calculate remaining number of decks
        const numDecksUsed = newCardCount / CARDS_IN_A_DECK
        const currentDecksLeft = deckCount - numDecksUsed
        // calculate true count
        const newTrueCount = newRunningCount / currentDecksLeft
        setTrueCount(newTrueCount)
    }

    const updateDeckNumber = (event, newValue) => {
        if (deckCount !== newValue) { 
            setDeckCount(newValue)
            reset()
        }
    }

    const toggleZeroes = () => {
        setUseZeroes(!useZeroes)
    }

    return (
        <div className={classes.center}>
            <Grid container className={classes.smol} justify='center' alignItems='center' spacing={1}>
                <Grid item xs={12} className={classes.centered}>
                    <Grid container direction='column' className={classes.centered}>
                        <Grid item xs={6}>
                            <Typography variant='h5'>Number of Decks</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6'>{deckCount}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                            <Typography variant='subtitle'>Set Decks</Typography>
                            <Slider
                                defaultValue={6}
                                aria-labelledby="discrete-slider-small-steps"
                                step={1}
                                marks
                                min={1}
                                max={12}
                                valueLabelDisplay="auto"
                                onChange={updateDeckNumber}
                            />
                </Grid>
                <Grid item xs={6} className={classes.centered}>
                    <Grid container direction='column' className={classes.centered} justify='center' alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant='h5'>Running Count</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6' color='#000'>{runningCount < 0 ? ' ' : runningCount > 0 ? '+' : ' '}{runningCount}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classes.centered}>
                    <Grid container direction='column' className={classes.centered} justify='center' alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant='h5'>True Count</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6'>{trueCount < 0 ? ' ' : trueCount > 0 ? '+' : ' '}{trueCount.toFixed(4)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
				<Grid item xs={useZeroes ? 4 : 6} className={classes.centered}>
                    <Button className={classes.addButtons} variant="outlined" color='primary' onClick={() => addCard(2)}>
                        <Grid container direction='column' className={classes.centered} justify='center' alignItems='center' spacing={1}>
                            <Grid item xs={6}>
                                <span className={classes.buttonText}>+2</span>
                            </Grid>
                            <Grid item xs={6} className={classes.center}>
                                <Typography variant='caption'>[4, 5, 6]</Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item xs={useZeroes ? 4 : 6} className={classes.centered}>
                    <Button className={classes.addButtons} variant="outlined" color='primary' onClick={() => addCard(1)}>
                        <Grid container direction='column' className={classes.centered} justify='center' alignItems='center' spacing={1}>
                            <Grid item xs={6}>
                                <span className={classes.buttonText}>+1</span>
                            </Grid>
                            <Grid item xs={6} className={classes.center}>
                                <Typography variant='caption'>[2, 3, 7]</Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                { useZeroes ? 
                <Grid item xs={4} className={classes.centered}>
                        <Button className={classes.addButtons} variant="outlined" color='primary' onClick={() => addCard(0)}>
                            <Grid container direction='column' className={classes.centered} justify='center' alignItems='center' spacing={1}>
                                <Grid item xs={6}>
                                    <span className={classes.buttonText}>0</span>
                                </Grid>
                                <Grid item xs={6} className={classes.center}>
                                    <Typography variant='caption'>[8,A]</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                </Grid> : null }
                <Grid item xs={useZeroes ? 4 : 6} className={classes.centered}>
                    <Button className={classes.addButtons} variant="outlined" color='primary' onClick={() => addCard(-1)}>
                        <Grid container direction='column' className={classes.centered} justify='center' alignItems='center' spacing={1}>
                            <Grid item xs={6}>
                                <span className={classes.buttonText}>-1</span>
                            </Grid>
                            <Grid item xs={6} className={classes.center}>
                                <Typography variant='caption'>[9]</Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
				<Grid item xs={useZeroes ? 4 : 6} className={classes.centered}>
                    <Button className={classes.addButtons} variant="outlined" color='primary' onClick={() => addCard(-2)}>
                        <Grid container direction='column' className={classes.centered} justify='center' alignItems='center' spacing={1}>
                            <Grid item xs={6}>
                                <span className={classes.buttonText}>-2</span>
                            </Grid>
                            <Grid item xs={6} className={classes.center}>
                                <Typography variant='caption'>[10,J,Q,K]</Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.topSpace}>
                        <Typography variant='h5'>Cards Seen:</Typography>
                        <Typography variant='h6'>{totalCardCount}</Typography>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.topSpace}>
                        <Typography variant='h5'>Advantage:</Typography>
                        <Typography variant='h6'>
                            {trueCount <= 0 ? 'Dealer' : 'Player'}
                            {' '}
                            ({Math.abs(trueCount) >= 8 ? 'High' : Math.abs(trueCount) >= 3 ? 'Medium' : 'Low'})
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.topSpace}>
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item xs={6} justify='center' alignItems='center'>
                            <Button className={classes.bottomButtons} variant={!useZeroes ? "contained" : 'outlined'} color="primary" onClick={toggleZeroes}>{!useZeroes ? "Use Zeros" : "Remove Zeros"}</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.topSpace} justify='center' alignItems='center'>
                            <Button className={classes.bottomButtons} variant="contained" color="secondary" onClick={reset}>Reset</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
