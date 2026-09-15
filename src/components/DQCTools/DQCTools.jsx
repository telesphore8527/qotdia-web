
import './DQCTools.css';
import { LuHeart, LuShare2 } from "react-icons/lu";
import { FaHeart } from 'react-icons/fa';
import { useQuoteActions } from '../../hooks/useQuoteActions';

const DQCTools = ({quote}) => {

	const {shareQuote, isFavorite, toggleFavorite} = useQuoteActions()



	return (
		<div className='dqctools'>
 			<div className="dqc-like" onClick={()=>toggleFavorite(quote)}>

				{
					isFavorite(quote.id) ? <FaHeart color='red' /> : <LuHeart />
				}
			</div>
            <div className="dqc-share" onClick={()=>shareQuote(quote)}>
				<LuShare2 />
			</div>
 		</div>
	);
};


export default DQCTools;