import PropTypes from 'prop-types'
import styles from '../styles/Header.module.css'
import React from "react";
import {AddRounded, FilterListRounded, RefreshRounded, SettingsRounded} from "@material-ui/icons";
import Dropdown from "./Dropdown";
import useHeader from "../hook/useHeader";
import keyTemplate from "../templates/keyTemplate";
import Filter from "../../filter/Filter";
import Button from "../../../inputs/button/Button";
import Header from "./Header";

export default function ListHeader(props) {
    const {
        getType,
        parseDate,
        open,
        setOpen,
        selectedField,
        setSelectedField,
        getField
    } = useHeader(props.dispatch, props.actions)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header} style={{marginBottom: props.filters.length === 0 ? '8px' : undefined}}>
                {props.title}
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Button
                        variant={'outlined'}
                        className={styles.button}
                        onClick={() => props.cleanState()}
                    >
                        Recarregar
                        <RefreshRounded style={{fontSize: '1.3rem'}}/>
                    </Button>
                    <Button
                        variant={'outlined'}
                        className={styles.button}
                        onClick={() => props.setOpenSettings(true)}
                    >
                        Configurações
                        <SettingsRounded style={{fontSize: '1.3rem'}}/>
                    </Button>
                    {props.noFilters ? null :
                        <Dropdown
                            className={styles.button}
                            disabled={false} variant={'outlined'}
                            label={(
                                <div className={styles.dropdownLabel}>
                                    Filtros
                                    <FilterListRounded style={{fontSize: '1.3rem'}}/>
                                </div>
                            )}
                            buttons={props.keys.map(e => getField(e))}
                        />}
                    <Button
                        styles={{display: props.createOption ? undefined : 'none', color: 'white'}}
                        onClick={() => props.onCreate()} variant={"filled"}
                        className={styles.button}>
                        <AddRounded/>
                    </Button>
                </div>
            </div>
            {props.noFilters ?
                null
                :
                <div style={{padding: '8px'}}>
                    <Filter
                        keys={props.keys} filters={props.filters} setFilters={props.setFilters}
                        getType={getType} open={open} setOpen={setOpen}
                        parseDate={parseDate} selectedField={selectedField} setSelectedField={setSelectedField}
                    />
                </div>
            }
            <Header
                keys={props.keys.filter(e => e.visible === true)}
                sorts={props.sorts}
                setSorts={props.setSorts}
                hasOptions={props.hasOptions}
            />
        </div>

    )
}

ListHeader.propTypes = {
    hook: PropTypes.object,
    noFilters: PropTypes.bool,
    dispatch: PropTypes.func,
    actions: PropTypes.object,

    title: PropTypes.any,
    setFilters: PropTypes.func,
    filters: PropTypes.array,

    cleanState: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,

    setOpenSettings: PropTypes.func,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func,
    hasOptions: PropTypes.bool
}
