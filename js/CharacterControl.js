import VariablesFromHTML from './VariablesFromHTML';

class CharacterControl {
	charDirection = {
		x: 0,
		y: 0,
	};

	charLastDirection = {
		x: 0,
		y: 0,
	};

	controls() {
		const keydown = [
			'keydown',
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
			'e.key',
		];
		const onClick = [
			'click',
			VariablesFromHTML.keyUp,
			VariablesFromHTML.keyDown,
			VariablesFromHTML.keyLeft,
			VariablesFromHTML.keyRight,
			'e.target',
		];

		const controlUpd = (kind, up, down, left, right, ekind) => {
			window.addEventListener(kind, e => {
				let eswitch;
				if (ekind === 'e.key') {
					eswitch = e.key;
				} else if (ekind === 'e.target') {
					eswitch = e.target;
				}

				switch (eswitch) {
					case up: {
						if (this.charLastDirection.y !== 0) break;
						this.charDirection = {
							x: 0,
							y: -1,
						};
						break;
					}
					case down: {
						if (this.charLastDirection.y !== 0) break;
						this.charDirection = {
							x: 0,
							y: 1,
						};
						break;
					}
					case left: {
						if (this.charLastDirection.x !== 0) break;
						this.charDirection = {
							x: -1,
							y: 0,
						};
						break;
					}
					case right:
						{
							if (this.charLastDirection.x !== 0) break;
							this.charDirection = {
								x: 1,
								y: 0,
							};
						}
						break;
				}
			});
		};

		controlUpd(
			onClick[0],
			onClick[1],
			onClick[2],
			onClick[3],
			onClick[4],
			onClick[5]
		);
		controlUpd(
			keydown[0],
			keydown[1],
			keydown[2],
			keydown[3],
			keydown[4],
			keydown[5]
		);
	}

	controlDirectionUpdate() {
		this.charLastDirection = this.charDirection;
		return this.charLastDirection;
	}
}

export default CharacterControl;
