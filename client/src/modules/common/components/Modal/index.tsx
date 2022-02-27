import React, { Fragment, ReactChild, useRef } from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

interface IModal {
	className?: string;
	children: ReactChild;
	onClose: () => void;
	open: boolean;
}



const Modal: React.FC<IModal> = ({ className, children, onClose, open }) => {
	const [isBrowser, setIsBrower] = useState<boolean>(false);
	const domref = useRef<any>(null);
	useEffect(() => {
		setIsBrower(true);
		const appRoot = document.getElementsByTagName("body")[0];
		domref.current = appRoot;

		() => {
			domref.current = null;
		};
	}, []);
	const ModalElement = (
		<Fragment>
			<div
				onClick={onClose}
				className={` fixed transition-all bg-opacity-0 duration-500  ${
					open ? `top-0 ${styles.modal_animation}` : "top-full"
				}  pt-24 left-0 right-0 bottom-0 flex flex-col-reverse   overflow-x-auto ${styles.modal}`}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className={`flex   w-full right-0 left-0 align-bottom  justify-items-center absolute  bg-white  ${className} ${styles.modal_inner}`}
				>
					<div className="relative w-full ">
						<img
							onClick={() => onClose()}
							className="absolute cursor-pointer select-none  right-5 top-5"
							src="/static/assets/icons/modal-close.svg"
						/>
						{children}
					</div>
				</div>
			</div>
		</Fragment>
	);

	if (isBrowser && domref.current) {
		return ReactDOM.createPortal(ModalElement, domref.current);
	} else return null;
};

export default Modal;
