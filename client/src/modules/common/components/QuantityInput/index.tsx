import React, { useState } from "react";
import styles from "./QuantityInput.module.scss";

interface IQuantityInput {
	className?: string;
}

const QuantityInput: React.FC<IQuantityInput> = ({ className }) => {
	const [items, setItems] = useState<{ name: string; qty: "" | number }[]>([
		{
			name: "Small",
			qty: 0,
		},
		{
			name: "Medium",
			qty: 0,
		},
		{
			name: "Large",
			qty: 0,
		},
		{
			name: "XL",
			qty: 0,
		},
		{
			name: "XXL",
			qty: 0,
		},
	]);

	const handleIncreaseQty = (index: number) => {
		const _items = [...items];
		_items.splice(index, 1, {
			...items[index],
			qty: Number(items[index].qty) + 1,
		});

		setItems(_items);
	};
	const handleDescreaseQty = (index: number) => {
		const _items = [...items];
		if (_items[index].qty > 0) {
			_items.splice(index, 1, {
				...items[index],
				qty: Number(items[index].qty) - 1,
			});
			
			setItems(_items);
		}
	};

	const handleChange = (index: number, value: string | number) => {
		const _items = [...items];
		_items.splice(index, 1, {
			...items[index],
			qty: value == "" ? "" : Number(value),
		});
		setItems(_items);
	};

	return (
		<div className={`${className} ${styles.container} rounded bg-white`}>
			{items.map((item, key) => {
				return (
					<div key={key} className={`flex items-center justify-between px-5 ${styles.items}`}>
						<div className="text-dh-gray-700 text-sm">{item.name}</div>
						<div className="flex gap-2.5">
							{item.qty !== 0 ? (
								<>
									<button
										onClick={() => handleDescreaseQty(key)}
										className={`w-6 cursor-pointer h-6 text-black rounded-full flex items-center justify-center ${styles.des_btn}`}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									<input
										onChange={(event) => handleChange(key, event.target.value)}
										value={item.qty}
										type="number"
										className={` h-6 w-6 text-sm  rounded flex items-center justify-center text-center appearance-none ${styles.input}`}
									/>
								</>
							) : null}

							<button
								onClick={() => handleIncreaseQty(key)}
								className={`w-6 cursor-pointer h-6 bg-dh-green-700 text-white rounded-full flex items-center justify-center ${styles.inc_btn}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

QuantityInput.defaultProps = {
	className: "",
};

export default QuantityInput;
