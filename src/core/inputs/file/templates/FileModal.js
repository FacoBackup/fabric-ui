import React, {useContext, useMemo, useRef} from "react";
import styles from '../styles/File.module.css'
import File from "./File";
import PropTypes from "prop-types";
import Empty from "../../../feedback/empty/Empty";
import Modal from "../../../navigation/modal/Modal";
import ThemeContext from "../../../misc/theme/ThemeContext";
import Button from "../../button/Button";

export default function FileModal(props) {
    const ref = useRef()
    const areaRef = useRef()

    const files = useMemo(() => {
        if (props.files !== undefined && props.files !== null)
            return props.files.map((e, i) => (
                <React.Fragment key={'file-' + i}>
                    <File type={(e.name.split('.').pop())} index={i} name={e.name}
                          handleDelete={props.handleFileRemoval}/>
                </React.Fragment>
            ))
    }, [props.files])
    const themes = useContext(ThemeContext)

    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={'slide-right'}
            blurIntensity={0}
            wrapperClassName={styles.modalContent}>
            <div className={styles.header}>
                <div style={{width: '100%'}}>
                    Anexar arquivos
                </div>
                <div className={[styles.headerAccepted, styles.overflow].join(' ')} style={{width: '100%'}}>
                    Tipos
                    aceitos: {props.accept.length > 0 ? props.accept.map((e, i) => e.split('.')[e.split('.').length - 1] + ((i < props.accept.length - 1) ? ', ' : '')) : 'todos'}
                </div>
            </div>
            <Button
                disabled={!props.multiple && props.files.length > 0}
                onClick={event => {
                    event.preventDefault()
                    ref.current.click()
                }}>
                Anexar arquivos
            </Button>

            <div
                className={[styles.dropArea, props.files.length > 0 ? styles.dropAreaContent : ''].join(' ')}
                ref={areaRef}
                style={{background: !props.multiple && props.files.length > 0 ?themes.theme.background1 : undefined}}
                onDragLeave={(e) => {
                    if (!(!props.multiple && props.files.length > 0)) {
                        areaRef.current.style.borderColor = themes.theme.border1
                        areaRef.current.style.background = themes.theme.backgroundBase
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                    if (!(!props.multiple && props.files.length > 0)) {
                        areaRef.current.style.borderColor = '#0095ff'
                        areaRef.current.style.background = themes.theme.background3
                    }
                }}
                onDrop={e => {
                    e.preventDefault()
                    if (!(!props.multiple && props.files.length > 0)) {
                        areaRef.current.style.borderColor = '#0095ff'
                        areaRef.current.style.background = themes.theme.background3
                        props.setFiles([...props.files, ...Array.from(e.dataTransfer.files)])
                    }

                }}>
                {props.files.length === 0 ?
                    <Empty customLabel={'Arraste seus arquivos aqui'}/>
                    :
                    files}
            </div>
            <input type="file" style={{display: 'none'}}
                   disabled={props.disabled} accept={props.accept}
                   multiple={props.multiple} ref={ref}
                   onChange={event => {
                       props.setFiles(Array.from(event.target.files))
                       ref.current.value = ''
                   }}
            />

        </Modal>
    )
}

FileModal.propTypes = {
    handleFileRemoval: PropTypes.func,
    setFiles: PropTypes.func,
    files: PropTypes.array,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    multiple: PropTypes.bool,
    accept: PropTypes.array
}