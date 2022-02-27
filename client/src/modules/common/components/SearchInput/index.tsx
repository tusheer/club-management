import React, { ChangeEvent, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import SearchIcon from "../../icons/SearchIcon";
import Button from "../Button";
import UserAvatar from "../UserAvatar";
import styles from "./SearchInput.module.scss";

const recentSearch = [
	"Superfine Fashion Fabrics",
	"Banex Apparel Ltd",
	"TRU Fabrics Ltd",
	"Banex Apparel Ltd",
	"Superfine Fashion Fabrics",
];

const groups = ["Hoodies", "Trousers", "Jackets", "Shirts", "Denim", "Trousers", "Shirts", "Denim", "Denim", "Hoodies"];

const SearchInput = () => {
	const [state, setState] = useState("");
	const [activeInput, setActiveInput] = useState(false);
	const ref = useRef(null);
	useOnClickOutside(ref, () => setActiveInput(false));
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState(event.target.value);
	};
	return (
		<div
			ref={ref}
			className={`${
				styles.root
			} absolute left-0 right-0 overflow-hidden top-0 z-50 bg-white transition-all duration-100 ${
				activeInput ? styles.active : ""
			}`}
		>
			<div className={`h-10 w-full items-center gap-3 flex  pl-4  pr-2.5 ${styles.active_input}`}>
				<div className="flex-shrink-0">
					<SearchIcon />
				</div>

				<input
					value={state}
					onChange={handleChange}
					onFocus={() => setActiveInput(true)}
					className="w-full h-full bg-transparent focus:outline-none text-sm"
					type="text"
					placeholder="Search by name, group, type and others"
				/>
				{!!state ? (
					<img
						onClick={() => setState("")}
						className="cursor-pointer"
						src="/static/assets/icons/clear.svg"
						alt="search cross"
					/>
				) : null}
			</div>
			{activeInput ? (
				<div className={`${styles.search_body} border-t border-dh-gray-200 p-5`}>
					{!!state ? (
						<div className="flex flex-col gap-3.5">
							<div className={`flex gap-3.5 items-center ${styles.search_item}`}>
								<UserAvatar
									name="Tusher"
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
									height={45}
									width={45}
								/>
								<div className="">
									<h5 className="mb-1 font-medium text-dh-gray-800">Banex Apparel Ltd</h5>
									<p className="text-dh-gray-700">Dhaka , Bangladesh</p>
								</div>
							</div>
							<div className={`flex gap-3.5 items-center ${styles.search_item}`}>
								<UserAvatar
									name="Tusher"
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
									height={45}
									width={45}
								/>
								<div className="">
									<h5 className="mb-1 font-medium text-dh-gray-800">Banex Apparel Ltd</h5>
									<p className="text-dh-gray-700">Dhaka , Bangladesh</p>
								</div>
							</div>
							<div className={`flex gap-3.5 items-center ${styles.search_item}`}>
								<UserAvatar
									name="Tusher"
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
									height={45}
									width={45}
								/>
								<div className="">
									<h5 className="mb-1 font-medium text-dh-gray-800">Banex Apparel Ltd</h5>
									<p className="text-dh-gray-700">Dhaka , Bangladesh</p>
								</div>
							</div>
							<div className={`flex gap-3.5 items-center ${styles.search_item}`}>
								<UserAvatar
									name="Tusher"
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
									height={45}
									width={45}
								/>
								<div className="">
									<h5 className="mb-1 font-medium text-dh-gray-800">Banex Apparel Ltd</h5>
									<p className="text-dh-gray-700">Dhaka , Bangladesh</p>
								</div>
							</div>
						</div>
					) : (
						<>
							<h4 className="mb-2.5">Recent search</h4>
							<div className="flex flex-wrap gap-2">
								{recentSearch.map((item, index) => {
									return (
										<div
											key={index}
											onClick={() => setState(item)}
											className={`h-6 px-2 flex justify-center items-center cursor-pointer rounded text-dh-gray-700 text-xs ${styles.tag} `}
										>
											{item}
										</div>
									);
								})}
							</div>
							<h4 className="mb-2.5 mt-5">Popular groups</h4>
							<div className="flex flex-wrap gap-2">
								{groups.map((item, index) => {
									return (
										<div
											key={index}
											onClick={() => setState(item)}
											className={`h-6 px-2 flex justify-center items-center cursor-pointer rounded text-dh-gray-700 text-xs ${styles.tag}`}
										>
											{item}
										</div>
									);
								})}
							</div>
							<div className="flex justify-end">
								<Button className="mt-10" color="secondaryGreen">
									Advance search
								</Button>
							</div>
						</>
					)}
				</div>
			) : null}
		</div>
	);
};

export default SearchInput;
