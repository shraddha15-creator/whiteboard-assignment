import "./panel.css";

export const Panel = ({ handleExport, color, setColor, user }) => {
	return (
		<div className="panel-container">
			<div className="collaborators-container">
				<p>
					Collaborators <span></span>
				</p>
				<div className="user-color-name">
					<input
						type="color"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						disabled
						id="user-color-sm"
					/>
					<p className="collab-user-name">{user}</p>
				</div>
			</div>
			<button onClick={handleExport} className="btn">
				Save
			</button>
		</div>
	);
};
