import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@custom/Icon';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';

export const EditorDialog = ({ displayName, visible, onOk }) => {
    const [name, setName] = useState(displayName);
    const [innerVisible, setVisible] = useState(visible);

    useEffect(() => {
        setName(displayName);
    }, [displayName])

    useEffect(() => {
        setVisible(visible);
    }, [visible])

    const onConfirm = (value)=>{
        setVisible(false);
        if(onOk && value!==displayName){
            onOk(value)
        }  
    }


    return (
        <div className='editor-dialog'>
            <div className="operator-btn editor" onClick={() => setVisible(true)}>
                <Icon className="operator-icon" name="editor" size="normal" />
            </div>
            <Modal
                visible={innerVisible}
                className="edit-name-modal"
                title={<div className="cus-module-title"><span>修改名称</span></div>}
            >

                <input
                    value={name}
                    autoFocus
                    className='edit-name-modal-input'
                    placeholder='请输入名称'
                    maxLength={10}
                    onChange={(event) => {
                        setName(event.currentTarget.value);
                    }}
                />
                <div className='modal-footer'>
                    <BtnGroup
                        layout='flex'
                    >
                        <Button
                            className="btn-cancel"
                            onClick={() => {
                                setVisible(false);
                                setName(displayName);
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            className="btn-save"
                            onClick={event=>onConfirm(name)}
                        >
                            确定
                        </Button>

                    </BtnGroup>
                </div>
            </Modal>
        </div>

    )


}
