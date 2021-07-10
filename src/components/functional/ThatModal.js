import React from 'react'
import { Modal, Box, Button } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import { ThemeContext } from "../../ThemeContext"
import { makeStyles } from '@material-ui/core/styles'

export default function ThatModal(props) {

    const [open, setOpen] = React.useState(props.activate ? true : false);

    const context = React.useContext(ThemeContext)

    const palette = context.palette

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)

        if (props.onClose !== undefined)
        {
            props.onClose()
        }
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        paper: {
            padding: "16px",
            color: palette.textColor,
            backgroundColor: palette.dark,
            border: "1px solid #000000"
        }
    }));

    const classes = useStyles();

    return (
        <>
            <span onClick={handleOpen}>
                {props.activeElement}
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {props.children}
                        <Box display="flex" justifyContent="flex-end">
                            <Button style={{color: "#03a9f4"}} onClick={handleClose}>Close</Button>
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}