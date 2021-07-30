import React from 'react'
import ReactDOM from "react-dom"
import { Modal, Box, Button } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import PropTypes from "prop-types"

let modalRoot = document.getElementById("modal-root")

class ThatModal extends React.Component
{
    constructor (props)
    {
        super(props)
        this.state = {
            open: true
        }

        this.parent = document.createElement("div")
    }

    componentDidMount ()
    {
        modalRoot.appendChild(this.parent)
    }

    componentWillUnmount ()
    {
        modalRoot.removeChild(this.parent)
    }

    openModal ()
    {
        this.setState((prevState) => {
            return {
                open: !prevState.open
            }
        }, () => {
            if (this.state.open === false && this.props.postAction !== undefined)
            {
                this.props.postAction()
            }
        })
    }

    render()
    {
        return ReactDOM.createPortal(
            <Modal
                open={this.state.open}
                onClose={this.openModal.bind(this)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Fade in={this.state.open} timeout={300}>
                    <Box style={{
                        padding: "16px",
                        color: "white",
                        backgroundColor: "#102027",
                        border: "1px solid #161616"
                    }}>
                        <div style={{padding: "2px"}}>
                            {this.props.children}
                        </div>
                        <Box display="flex" justifyContent="flex-end" className="w-100 mt-auto">
                            <Button style={{color: "#03a9f4"}} onClick={this.openModal.bind(this)}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>,
            this.parent
        )
    }
}

export default ThatModal

ThatModal.propTypes = {
    postAction: PropTypes.func
}