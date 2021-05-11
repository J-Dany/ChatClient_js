import React from "react"
import InfoIcon from '@material-ui/icons/Info'
import { Button, IconButton, Modal, Typography, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import { ThemeContext } from "../../ThemeContext"

function InfoButton(props)
{
    const context = React.useContext(ThemeContext)

    const palette = context.palette

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        paper: {
            padding: "16px",
            color: "#FFFFFF",
            backgroundColor: palette.dark,
            border: "1px solid #000000"
        }
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <IconButton edge="end" onClick={handleOpen}>
            <InfoIcon />
        </IconButton>
        <Modal
            open={open}
            className={classes.modal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h6"><strong>Server IP:</strong></Typography>
                    <Typography variant="body1">This value can be either <i>localhost</i> or <i>X.X.X.X</i></Typography>
                    <Typography variant="h6"><strong>Server Port:</strong></Typography>
                    <Typography variant="body1">A value between 0 and 65536</Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Button color="primary" onClick={handleClose}>Close</Button>
                    </Box>
                </div>
            </Fade>
        </Modal>
        </>
    )
}

export default InfoButton