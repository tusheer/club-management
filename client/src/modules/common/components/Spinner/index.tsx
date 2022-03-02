import { HashLoader } from 'react-spinners';

interface ISpinner {
    size?: number;
    className?: string;
}

const Spinner: React.FC<ISpinner> = ({ size = 30, className = '' }) => {
    return (
        <div className={`w-full flex justify-center items-center  ${className}`}>
            <HashLoader size={size} color='#9C51E0' />
        </div>
    );
};
export default Spinner;
