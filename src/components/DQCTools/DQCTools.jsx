
import './DQCTools.css';
import { LuHeart, LuShare2 } from "react-icons/lu";
import { FaHeart } from 'react-icons/fa';

const DQCTools = ({quote}) => {
	return (
		<div className='dqctools'>
 			<div className="dqc-like">
				{/* <LuHeart /> */}
				<FaHeart color='red' />
			</div>
            <div className="dqc-share">
				<LuShare2 />
			</div>
 		</div>
	);
};


export default DQCTools;