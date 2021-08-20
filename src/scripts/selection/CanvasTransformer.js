import { InkCanvas2D, StrokeRenderer2D, BlendMode } from 'digital-ink';

import CanvasBubble from './CanvasBubble';

class CanvasTransformer extends CanvasBubble {
	constructor(lens, width, height, modelSize) {
		super(".layer-transforms", lens, width, height);

		this.modelSize = modelSize;

		this.canvas = InkCanvas2D.createInstance(this.surface, width, height);
		this.originLayer = this.canvas.createLayer(modelSize);

		this.strokeRenderer = new StrokeRenderer2D(this.canvas, modelSize);
	}

	draw(strokes) {
		this.originLayer.clear();

		if (!this.modelSize)
			this.strokeRenderer.setTransform(this.transform);

		let dirtyArea = this.strokeRenderer.blendStrokes(strokes, this.originLayer);

		this.canvas.blend(this.originLayer, {mode: BlendMode.COPY, rect: dirtyArea});
	}

	refresh(transform) {
		if (this.modelSize) {
			if (transform)
				transform = this.transform.multiply(transform);
			else
				transform = this.transform;
		}

		this.canvas.clear();
		this.canvas.blend(this.originLayer, {transform});
	}
}

export default CanvasTransformer;