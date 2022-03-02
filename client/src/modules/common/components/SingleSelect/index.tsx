import React, { useEffect, useState } from 'react';
import styles from './SingleSelect.module.scss';
import { useCombobox, useSelect } from 'downshift';
import classNames from 'classnames';

export interface ISingleSelectItem {
    value: string;
    label: string;
    [k: string]: string;
}

interface ISingleSelect {
    items: ISingleSelectItem[];
    data: ISingleSelectItem;
    label?: string;
    onChange: (value: ISingleSelectItem) => void;
    className?: string;
    error?: boolean;
    errorText?: string;
}

const SingleSelect: React.FC<ISingleSelect> = ({ items, data, label, onChange, className = '', error, errorText }) => {
    const [inputItems, setInputItems] = useState(items);

    useEffect(() => {
        setInputItems(items);
    }, [items]);

    const [inputValue, setInputValue] = useState('');
    const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } =
        useCombobox({
            itemToString: (value) => value?.label || '',
            onStateChange: (value) => {
                if (!!value.selectedItem) {
                    onChange(value.selectedItem);
                }
            },

            items: inputItems,
            selectedItem: data.label ? data : null,

            onInputValueChange: ({ inputValue = '' }) => {
                setInputValue(inputValue);
                if (inputValue === '') {
                    setInputItems(items);
                    onChange({
                        value: '',
                        label: '',
                    });
                } else {
                    if (data.value) {
                        setInputItems(
                            items.sort((item) => {
                                const match = item.label.toLowerCase().startsWith(inputValue.toLowerCase());
                                return match ? -1 : 1;
                            })
                        );
                    } else {
                        return items;
                    }
                }
            },
        });
    return (
        <div className={classNames({ [styles.error]: error }, 'relative', styles.root, className)} {...getComboboxProps()}>
            <label {...getLabelProps()} className={`${styles.label}`}>
                <button 
                    type="button"
                    {...getToggleButtonProps()}
                    tabIndex={-4}
                    className={`${styles.input_wraper}  relative  w-full flex justify-between items-center py-2 px-2.5 rounded `}
                >
                    <div className={` ${styles.item_wraper} ${isOpen ? 'flex-wrap' : 'flex-wrap'}`}>
                        <input className='bg-transparent border-none outline-none h-full w-full text-base' {...getInputProps()} />
                    </div>
                    <div className={`${styles.arrow_wrraper} right-0  bottom-0 w-10 h-full flex items-center justify-center absolute`}>
                        <div
                            style={{ transform: `rotate(${isOpen ? '180deg' : '0deg'})` }}
                            className={`${styles.arrow} transition-all duration-300 h-0 w-0`}
                        ></div>
                    </div>
                </button>
                <span className={`${styles.span_label}  ${data?.value || inputValue ? styles.span_label_active : ''}`}>
                    {label || 'Select'}
                </span>
            </label>

            <ul
                className={isOpen ? 'absolute gap-2 max-h-72 overflow-y-auto flex-wrap flex rounded p-2  bg-white' : ''}
                {...getMenuProps()}
            >
                {isOpen &&
                    inputItems.map((item, index) => (
                        <li
                            className={`cursor-pointer text-dh-gray-700 text-xs bg-white ${
                                highlightedIndex === index ? 'bg-dh-gray-200' : ''
                            }`}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
            {error ? <span className={styles.error_text}>{errorText}</span> : null}
        </div>
    );
};

export default SingleSelect;
