import { ListWrapper } from 'angular2/src/facade/collection';
import { templateVisitAll } from '../template_ast';
import { bindRenderText, bindRenderInputs, bindDirectiveInputs, bindDirectiveHostProps } from './property_binder';
import { bindRenderOutputs, collectEventListeners, bindDirectiveOutputs } from './event_binder';
import { bindDirectiveAfterContentLifecycleCallbacks, bindDirectiveAfterViewLifecycleCallbacks, bindDirectiveDestroyLifecycleCallbacks, bindPipeDestroyLifecycleCallbacks, bindDirectiveDetectChangesLifecycleCallbacks } from './lifecycle_binder';
export function bindView(view, parsedTemplate) {
    var visitor = new ViewBinderVisitor(view);
    templateVisitAll(visitor, parsedTemplate);
    view.pipes.forEach((pipe) => { bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
}
class ViewBinderVisitor {
    constructor(view) {
        this.view = view;
        this._nodeIndex = 0;
    }
    visitBoundText(ast, parent) {
        var node = this.view.nodes[this._nodeIndex++];
        bindRenderText(ast, node, this.view);
        return null;
    }
    visitText(ast, parent) {
        this._nodeIndex++;
        return null;
    }
    visitNgContent(ast, parent) { return null; }
    visitElement(ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = collectEventListeners(ast.outputs, ast.directives, compileElement);
        bindRenderInputs(ast.inputs, compileElement);
        bindRenderOutputs(eventListeners);
        ListWrapper.forEachWithIndex(ast.directives, (directiveAst, index) => {
            var directiveInstance = compileElement.directiveInstances[index];
            bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
            bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
        });
        templateVisitAll(this, ast.children, compileElement);
        // afterContent and afterView lifecycles need to be called bottom up
        // so that children are notified before parents
        ListWrapper.forEachWithIndex(ast.directives, (directiveAst, index) => {
            var directiveInstance = compileElement.directiveInstances[index];
            bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        return null;
    }
    visitEmbeddedTemplate(ast, parent) {
        var compileElement = this.view.nodes[this._nodeIndex++];
        var eventListeners = collectEventListeners(ast.outputs, ast.directives, compileElement);
        ListWrapper.forEachWithIndex(ast.directives, (directiveAst, index) => {
            var directiveInstance = compileElement.directiveInstances[index];
            bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
            bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        bindView(compileElement.embeddedView, ast.children);
        return null;
    }
    visitAttr(ast, ctx) { return null; }
    visitDirective(ast, ctx) { return null; }
    visitEvent(ast, eventTargetAndNames) {
        return null;
    }
    visitReference(ast, ctx) { return null; }
    visitVariable(ast, ctx) { return null; }
    visitDirectiveProperty(ast, context) { return null; }
    visitElementProperty(ast, context) { return null; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19iaW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLThYb1hLaWtaLnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci92aWV3X2JpbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUNMLFdBQVcsRUFDWixNQUFNLGdDQUFnQztPQUNoQyxFQWVMLGdCQUFnQixFQUdqQixNQUFNLGlCQUFpQjtPQUNqQixFQUNMLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN2QixNQUFNLG1CQUFtQjtPQUNuQixFQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCO09BQ3RGLEVBQ0wsMkNBQTJDLEVBQzNDLHdDQUF3QyxFQUN4QyxzQ0FBc0MsRUFDdEMsaUNBQWlDLEVBQ2pDLDRDQUE0QyxFQUM3QyxNQUFNLG9CQUFvQjtBQUkzQix5QkFBeUIsSUFBaUIsRUFBRSxjQUE2QjtJQUN2RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxDQUFDLElBQUksT0FBTyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQUVEO0lBR0UsWUFBbUIsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUY1QixlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBRVEsQ0FBQztJQUV4QyxjQUFjLENBQUMsR0FBaUIsRUFBRSxNQUFzQjtRQUN0RCxJQUFJLElBQUksR0FBRyxJ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QVMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDeEYsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTGlzdFdyYXBwZXIsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBUZW1wbGF0ZUFzdCxcbiAgVGVtcGxhdGVBc3RWaXNpdG9yLFxuICBOZ0NvbnRlbnRBc3QsXG4gIEVtYmVkZGVkVGVtcGxhdGVBc3QsXG4gIEVsZW1lbnRBc3QsXG4gIFJlZmVyZW5jZUFzdCxcbiAgVmFyaWFibGVBc3QsXG4gIEJvdW5kRXZlbnRBc3QsXG4gIEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LFxuICBBdHRyQXN0LFxuICBCb3VuZFRleHRBc3QsXG4gIFRleHRBc3QsXG4gIERpcmVjdGl2ZUFzdCxcbiAgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCxcbiAgdGVtcGxhdGVWaXNpdEFsbCxcbiAgUHJvcGVydHlCaW5kaW5nVHlwZSxcbiAgUHJvdmlkZXJBc3Rcbn0gZnJvbSAnLi4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7XG4gIGJpbmRSZW5kZXJUZXh0LFxuICBiaW5kUmVuZGVySW5wdXRzLFxuICBiaW5kRGlyZWN0aXZlSW5wdXRzLFxuICBiaW5kRGlyZWN0aXZlSG9zdFByb3BzXG59IGZyb20gJy4vcHJvcGVydHlfYmluZGVyJztcbmltcG9ydCB7YmluZFJlbmRlck91dHB1dHMsIGNvbGxlY3RFdmVudExpc3RlbmVycywgYmluZERpcmVjdGl2ZU91dHB1dHN9IGZyb20gJy4vZXZlbnRfYmluZGVyJztcbmltcG9ydCB7XG4gIGJpbmREaXJlY3RpdmVBZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3MsXG4gIGJpbmREaXJlY3RpdmVBZnRlclZpZXdMaWZlY3ljbGVDYWxsYmFja3MsXG4gIGJpbmREaXJlY3RpdmVEZXN0cm95TGlmZWN5Y2xlQ2FsbGJhY2tzLFxuICBiaW5kUGlwZURlc3Ryb3lMaWZlY3ljbGVDYWxsYmFja3MsXG4gIGJpbmREaXJlY3RpdmVEZXRlY3RDaGFuZ2VzTGlmZWN5Y2xlQ2FsbGJhY2tzXG59IGZyb20gJy4vbGlmZWN5Y2xlX2JpbmRlcic7XG5pbXBvcnQge0NvbXBpbGVWaWV3fSBmcm9tICcuL2NvbXBpbGVfdmlldyc7XG5pbXBvcnQge0NvbXBpbGVFbGVtZW50LCBDb21waWxlTm9kZX0gZnJvbSAnLi9jb21waWxlX2VsZW1lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZFZpZXcodmlldzogQ29tcGlsZVZpZXcsIHBhcnNlZFRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdKTogdm9pZCB7XG4gIHZhciB2aXNpdG9yID0gbmV3IFZpZXdCaW5kZXJWaXNpdG9yKHZpZXcpO1xuICB0ZW1wbGF0ZVZpc2l0QWxsKHZpc2l0b3IsIHBhcnNlZFRlbXBsYXRlKTtcbiAgdmlldy5waXBlcy5mb3JFYWNoKFxuICAgICAgKHBpcGUpID0+IHsgYmluZFBpcGVEZXN0cm95TGlmZWN5Y2xlQ2FsbGJhY2tzKHBpcGUubWV0YSwgcGlwZS5pbnN0YW5jZSwgcGlwZS52aWV3KTsgfSk7XG59XG5cbmNsYXNzIFZpZXdCaW5kZXJWaXNpdG9yIGltcGxlbWVudHMgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgcHJpdmF0ZSBfbm9kZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3OiBDb21waWxlVmlldykge31cblxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgcGFyZW50OiBDb21waWxlRWxlbWVudCk6IGFueSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnZpZXcubm9kZXNbdGhpcy5fbm9kZUluZGV4KytdO1xuICAgIGJpbmRSZW5kZXJUZXh0KGFzdCwgbm9kZSwgdGhpcy52aWV3KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFRleHQoYXN0OiBUZXh0QXN0LCBwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYW55IHtcbiAgICB0aGlzLl9ub2RlSW5kZXgrKztcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0TmdDb250ZW50KGFzdDogTmdDb250ZW50QXN0LCBwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYW55IHtcbiAgICB2YXIgY29tcGlsZUVsZW1lbnQgPSA8Q29tcGlsZUVsZW1lbnQ+dGhpcy52aWV3Lm5vZGVzW3RoaXMuX25vZGVJbmRleCsrXTtcbiAgICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBjb2xsZWN0RXZlbnRMaXN0ZW5lcnMoYXN0Lm91dHB1dHMsIGFzdC5kaXJlY3RpdmVzLCBjb21waWxlRWxlbWVudCk7XG4gICAgYmluZFJlbmRlcklucHV0cyhhc3QuaW5wdXRzLCBjb21waWxlRWxlbWVudCk7XG4gICAgYmluZFJlbmRlck91dHB1dHMoZXZlbnRMaXN0ZW5lcnMpO1xuICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgoYXN0LmRpcmVjdGl2ZXMsIChkaXJlY3RpdmVBc3QsIGluZGV4KSA9PiB7XG4gICAgICB2YXIgZGlyZWN0aXZlSW5zdGFuY2UgPSBjb21waWxlRWxlbWVudC5kaXJlY3RpdmVJbnN0YW5jZXNbaW5kZXhdO1xuICAgICAgYmluZERpcmVjdGl2ZUlucHV0cyhkaXJlY3RpdmVBc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCBjb21waWxlRWxlbWVudCk7XG4gICAgICBiaW5kRGlyZWN0aXZlRGV0ZWN0Q2hhbmdlc0xpZmVjeWNsZUNhbGxiYWNrcyhkaXJlY3RpdmVBc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCBjb21waWxlRWxlbWVudCk7XG5cbiAgICAgIGJpbmREaXJlY3RpdmVIb3N0UHJvcHMoZGlyZWN0aXZlQXN0LCBkaXJlY3RpdmVJbnN0YW5jZSwgY29tcGlsZUVsZW1lbnQpO1xuICAgICAgYmluZERpcmVjdGl2ZU91dHB1dHMoZGlyZWN0aXZlQXN0LCBkaXJlY3RpdmVJbnN0YW5jZSwgZXZlbnRMaXN0ZW5lcnMpO1xuICAgIH0pO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmNoaWxkcmVuLCBjb21waWxlRWxlbWVudCk7XG4gICAgLy8gYWZ0ZXJDb250ZW50IGFuZCBhZnRlclZpZXcgbGlmZWN5Y2xlcyBuZWVkIHRvIGJlIGNhbGxlZCBib3R0b20gdXBcbiAgICAvLyBzbyB0aGF0IGNoaWxkcmVuIGFyZSBub3RpZmllZCBiZWZvcmUgcGFyZW50c1xuICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgoYXN0LmRpcmVjdGl2ZXMsIChkaXJlY3RpdmVBc3QsIGluZGV4KSA9PiB7XG4gICAgICB2YXIgZGlyZWN0aXZlSW5zdGFuY2UgPSBjb21waWxlRWxlbWVudC5kaXJlY3RpdmVJbnN0YW5jZXNbaW5kZXhdO1xuICAgICAgYmluZERpcmVjdGl2ZUFmdGVyQ29udGVudExpZmVjeWNsZUNhbGxiYWNrcyhkaXJlY3RpdmVBc3QuZGlyZWN0aXZlLCBkaXJlY3RpdmVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGlsZUVsZW1lbnQpO1xuICAgICAgYmluZERpcmVjdGl2ZUFmdGVyVmlld0xpZmVjeWNsZUNhbGxiYWNrcyhkaXJlY3RpdmVBc3QuZGlyZWN0aXZlLCBkaXJlY3RpdmVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGlsZUVsZW1lbnQpO1xuICAgICAgYmluZERpcmVjdGl2ZURlc3Ryb3lMaWZlY3ljbGVDYWxsYmFja3MoZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZSwgZGlyZWN0aXZlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBFbWJlZGRlZFRlbXBsYXRlQXN0LCBwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYW55IHtcbiAgICB2YXIgY29tcGlsZUVsZW1lbnQgPSA8Q29tcGlsZUVsZW1lbnQ+dGhpcy52aWV3Lm5vZGVzW3RoaXMuX25vZGVJbmRleCsrXTtcbiAgICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBjb2xsZWN0RXZlbnRMaXN0ZW5lcnMoYXN0Lm91dHB1dHMsIGFzdC5kaXJlY3RpdmVzLCBjb21waWxlRWxlbWVudCk7XG4gICAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleChhc3QuZGlyZWN0aXZlcywgKGRpcmVjdGl2ZUFzdCwgaW5kZXgpID0+IHtcbiAgICAgIHZhciBkaXJlY3RpdmVJbnN0YW5jZSA9IGNvbXBpbGVFbGVtZW50LmRpcmVjdGl2ZUluc3RhbmNlc1tpbmRleF07XG4gICAgICBiaW5kRGlyZWN0aXZlSW5wdXRzKGRpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVEZXRlY3RDaGFuZ2VzTGlmZWN5Y2xlQ2FsbGJhY2tzKGRpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVPdXRwdXRzKGRpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIGV2ZW50TGlzdGVuZXJzKTtcbiAgICAgIGJpbmREaXJlY3RpdmVBZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3MoZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZSwgZGlyZWN0aXZlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVBZnRlclZpZXdMaWZlY3ljbGVDYWxsYmFja3MoZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZSwgZGlyZWN0aXZlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVEZXN0cm95TGlmZWN5Y2xlQ2FsbGJhY2tzKGRpcmVjdGl2ZUFzdC5kaXJlY3RpdmUsIGRpcmVjdGl2ZUluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGlsZUVsZW1lbnQpO1xuICAgIH0pO1xuICAgIGJpbmRWaWV3KGNvbXBpbGVFbGVtZW50LmVtYmVkZGVkVmlldywgYXN0LmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0QXR0cihhc3Q6IEF0dHJBc3QsIGN0eDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXREaXJlY3RpdmUoYXN0OiBEaXJlY3RpdmVBc3QsIGN0eDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRFdmVudChhc3Q6IEJvdW5kRXZlbnRBc3QsIGV2ZW50VGFyZ2V0QW5kTmFtZXM6IE1hcDxzdHJpbmcsIEJvdW5kRXZlbnRBc3Q+KTogYW55IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0UmVmZXJlbmNlKGFzdDogUmVmZXJlbmNlQXN0LCBjdHg6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0VmFyaWFibGUoYXN0OiBWYXJpYWJsZUFzdCwgY3R4OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRFbGVtZW50UHJvcGVydHkoYXN0OiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbn1cbiJdfQ==