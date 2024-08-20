import { useMemo } from "react";
import PropTypes from "prop-types";

const defaultStyles = {
	position: "relative",
	overflow: "hidden",
	cursor: "pointer",
	display: "block",
	float: "left",
};

export default function Star({ index, active, config, onMouseOver, onMouseLeave, onClick, halfStarHidden, halfStarAt, isUsingIcons, uniqueness }) {
	const { color, activeColor, size, char, isHalf, edit, halfIcon, emptyIcon, filledIcon } = config;

	const starClass = useMemo(() => {
		if (isHalf && !halfStarHidden && halfStarAt === index) {
			if (!isUsingIcons) return `react-stars-${uniqueness}`;
			return "react-stars-half";
		}
		return "";
	}, [isHalf, halfStarHidden, halfStarAt, index, isUsingIcons, uniqueness]);

	const style = useMemo(() => {
		return {
			...defaultStyles,
			color: active ? activeColor : color,
			cursor: edit ? "pointer" : "default",
			fontSize: `${size}px`,
		};
	}, [active, activeColor, color, size]);

	const renderIcon = useMemo(() => {
		if (!isUsingIcons) return char;
		if (active) return filledIcon;
		if (halfStarHidden) return emptyIcon;
		return halfIcon;
	}, [isUsingIcons, active, char, filledIcon, halfIcon, emptyIcon, halfStarHidden]);

	return (
		<span
			className={starClass}
			style={style}
			key={index}
			data-index={index}
			data-forhalf={filledIcon ? index : char}
			onMouseOver={onMouseOver}
			onMouseMove={onMouseOver}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
		>
			{renderIcon}
		</span>
	);
}

Star.propTypes = {
	index: PropTypes.number,
	active: PropTypes.bool,
	config: PropTypes.object,
	onMouseOver: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onClick: PropTypes.func,
	halfStarHidden: PropTypes.bool,
	halfStarAt: PropTypes.number,
	isUsingIcons: PropTypes.bool,
	uniqueness: PropTypes.string,
};
