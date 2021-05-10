import React from "react"
import InfoIcon from '@material-ui/icons/Info'
import { IconButton, Modal } from "@material-ui/core"
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
            backgroundColor: palette.color,
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
        <IconButton edge="start" onClick={handleOpen}>
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
                    <h4><strong>Server IP:</strong></h4>
                    <p>Il formato per l'ip del server è il seguente:</p>
                    <p><strong>(ip|ddns):(porta)</strong></p>
                </div>
            </Fade>
        </Modal>
        </>
    )
}

export default InfoButton