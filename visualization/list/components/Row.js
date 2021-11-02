import PropTypes from 'prop-types'
import styles from '../styles/Row.module.css'
import React from 'react'
import RowCell from "../../shared/RowCell";
import keyTemplate from "../templates/keyTemplate";
import Button from "../../../inputs/button/Button";
import {ArrowDropDownRounded} from "@material-ui/icons";
import Dropdown from "./Dropdown";

export default function Row(props) {
    return (
        <div style={{display: 'flex'}} ref={props.reference}>
            <Button className={styles.row}
                    variant={'minimal-horizontal'} onClick={() => props.onClick()}>
                {props.keys.map((e, i) => (
                    <React.Fragment key={i + '-row-cell-' + props.index}>
                        <div
                            style={{display: i === 0 ? 'none' : undefined, height: '40%'}}
                            className={styles.divider}
                        />
                        <div
                            className={styles.cell}

                            style={{
                                width: `${(1 / props.keys.length) * 100}%`,
                                // color: 'var(--mfc-color-tertiary)'
                            }}>
                            <div className={styles.overflow}>
                                <RowCell data={props.entry} field={e}/>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </Button>
            {props.controlButtons ?
                <div
                    className={styles.cell}
                    style={{
                        width: '30px',
                        alignItems: 'unset',
                        height: '60px',
                        padding: 0
                    }}>
                    <Dropdown
                        className={styles.mainButton} variant={'minimal-horizontal'}
                        label={<ArrowDropDownRounded/>}
                        buttons={props.controlButtons}
                        onClickProps={props.entry}/>
                </div>
                :
                null}
        </div>
    )
}

Row.propTypes = {
    keys: PropTypes.arrayOf(keyTemplate),
    entry: PropTypes.object,
    onClick: PropTypes.func,
    hasOptions: PropTypes.bool,
    index: PropTypes.number,
    reference: PropTypes.func,
    controlButtons: PropTypes.array

}
