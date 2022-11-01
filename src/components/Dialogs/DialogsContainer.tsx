import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/store";

let mapStateToProps = (state: AppStateType) => {
    return {
        messagePage: state.messagePage
    }
}

const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps ))
(Dialogs)
export default DialogsContainer