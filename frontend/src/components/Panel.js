import React from "react";

export const Panel = ({ handleExport }) => {
	return (
		<div className="panel-container">
			<button onClick={handleExport} className="btn">
				Save
			</button>
		</div>
	);
};
