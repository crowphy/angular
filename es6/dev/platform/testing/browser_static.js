import { APP_ID, NgZone, Provider, PLATFORM_COMMON_PROVIDERS, PLATFORM_INITIALIZER } from 'angular2/core';
import { DirectiveResolver, ViewResolver } from 'angular2/compiler';
import { BROWSER_APP_COMMON_PROVIDERS } from 'angular2/src/platform/browser_common';
import { BrowserDomAdapter } from 'angular2/src/platform/browser/browser_adapter';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { MockAnimationBuilder } from 'angular2/src/mock/animation_builder_mock';
import { MockDirectiveResolver } from 'angular2/src/mock/directive_resolver_mock';
import { MockViewResolver } from 'angular2/src/mock/view_resolver_mock';
import { MockLocationStrategy } from 'angular2/src/mock/mock_location_strategy';
import { LocationStrategy } from 'angular2/platform/common';
import { MockNgZone } from 'angular2/src/mock/ng_zone_mock';
import { XHRImpl } from "angular2/src/platform/browser/xhr_impl";
import { XHR } from 'angular2/compiler';
import { TestComponentBuilder } from 'angular2/src/testing/test_component_builder';
import { BrowserDetection } from 'angular2/src/testing/utils';
import { ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/common_dom';
import { CONST_EXPR, IS_DART } from 'angular2/src/facade/lang';
import { Log } from 'angular2/src/testing/utils';
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
function createNgZone() {
    return IS_DART ? new MockNgZone() : new NgZone({ enableLongStackTrace: true });
}
/**
 * Default platform providers for testing without a compiler.
 */
export const TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = CONST_EXPR([
    PLATFORM_COMMON_PROVIDERS,
    new Provider(PLATFORM_INITIALIZER, { useValue: initBrowserTests, multi: true })
]);
export const ADDITIONAL_TEST_BROWSER_PROVIDERS = CONST_EXPR([
    new Provider(APP_ID, { useValue: 'a' }),
    ELEMENT_PROBE_PROVIDERS,
    new Provider(DirectiveResolver, { useClass: MockDirectiveResolver }),
    new Provider(ViewResolver, { useClass: MockViewResolver }),
    Log,
    TestComponentBuilder,
    new Provider(NgZone, { useFactory: createNgZone }),
    new Provider(LocationStrategy, { useClass: MockLocationStrategy }),
    new Provider(AnimationBuilder, { useClass: MockAnimationBuilder }),
]);
/**
 * Default application providers for testing without a compiler.
 */
export const TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = CONST_EXPR([
    BROWSER_APP_COMMON_PROVIDERS,
    new Provider(XHR, { useClass: XHRImpl }),
    ADDITIONAL_TEST_BROWSER_PROVIDERS
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9zdGF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLThYb1hLaWtaLnRtcC9hbmd1bGFyMi9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXJfc3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IseUJBQXlCLEVBQ3pCLG9CQUFvQixFQUNyQixNQUFNLGVBQWU7T0FDZixFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBQyxNQUFNLG1CQUFtQjtPQUMxRCxFQUFDLDRCQUE0QixFQUFDLE1BQU0sc0NBQXNDO09BQzFFLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQ0FBK0M7T0FFeEUsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QztPQUNoRSxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMENBQTBDO09BQ3RFLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQ0FBMkM7T0FDeEUsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNDQUFzQztPQUM5RCxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMENBQTBDO09BQ3RFLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEI7T0FDbEQsRUFBQyxVQUFVLEVBQUMsTUFBTSxnQ0FBZ0M7T0FFbEQsRUFBQyxPQUFPLEVBQUMsTUFBTSx3Q0FBd0M7T0FDdkQsRUFBQyxHQUFHLEVBQUMsTUFBTSxtQkFBbUI7T0FFOUIsRUFDTCxvQkFBb0IsRUFHckIsTUFBTSw2Q0FBNkM7T0FFN0MsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDRCQUE0QjtPQUVwRCxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCO09BRTdELEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLDBCQUEwQjtPQUVyRCxFQUFDLEdBQUcsRUFBQyxNQUFNLDRCQUE0QjtBQUU5QztJQUNFLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVEOztHQUVHO0FBQ0gsT0FBTyxNQUFNLHNDQUFzQyxHQUMvQyxVQUFVLENBQUM7SUFDVCx5QkFBeUI7SUFDekIsSUFBSSxRQUFRLENBQUMsb0JBQW9CLEVBQUUsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0NBQzlFLENBQUMsQ0FBQztBQUVQLE9BQU8sTUFBTSxpQ0FBaUMsR0FDMUMsVUFBVSxDQUFDO0lBQ1QsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQ3JDLHVCQUF1QjtJQUN2QixJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBQyxDQUFDO0lBQ2xFLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3hELEdBQUc7SUFDSCxvQkFBb0I7SUFDcEIsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxDQUFDO0lBQ2hELElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLENBQUM7SUFDaEUsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQztDQUNqRSxDQUFDLENBQUM7QUFFUDs7R0FFRztBQUNILE9BQU8sTUFBTSx5Q0FBeUMsR0FDbEQsVUFBVSxDQUFDO0lBQ1QsNEJBQTRCO0lBQzVCLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztJQUN0QyxpQ0FBaUM7Q0FDbEMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQVBQX0lELFxuICBOZ1pvbmUsXG4gIFByb3ZpZGVyLFxuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBQTEFURk9STV9JTklUSUFMSVpFUlxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXIsIFZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuaW1wb3J0IHtCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24nO1xuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcblxuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge01vY2tBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9hbmltYXRpb25fYnVpbGRlcl9tb2NrJztcbmltcG9ydCB7TW9ja0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jayc7XG5pbXBvcnQge01vY2tWaWV3UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL3ZpZXdfcmVzb2x2ZXJfbW9jayc7XG5pbXBvcnQge01vY2tMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9tb2NrX2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbmltcG9ydCB7TW9ja05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svbmdfem9uZV9tb2NrJztcblxuaW1wb3J0IHtYSFJJbXBsfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2ltcGxcIjtcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5cbmltcG9ydCB7XG4gIFRlc3RDb21wb25lbnRCdWlsZGVyLFxuICBDb21wb25lbnRGaXh0dXJlQXV0b0RldGVjdCxcbiAgQ29tcG9uZW50Rml4dHVyZU5vTmdab25lXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RfY29tcG9uZW50X2J1aWxkZXInO1xuXG5pbXBvcnQge0Jyb3dzZXJEZXRlY3Rpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3V0aWxzJztcblxuaW1wb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5cbmltcG9ydCB7Q09OU1RfRVhQUiwgSVNfREFSVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtMb2d9IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3V0aWxzJztcblxuZnVuY3Rpb24gaW5pdEJyb3dzZXJUZXN0cygpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgQnJvd3NlckRldGVjdGlvbi5zZXR1cCgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIElTX0RBUlQgPyBuZXcgTW9ja05nWm9uZSgpIDogbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWV9KTtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IHBsYXRmb3JtIHByb3ZpZGVycyBmb3IgdGVzdGluZyB3aXRob3V0IGEgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfU1RBVElDX1BMQVRGT1JNX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihQTEFURk9STV9JTklUSUFMSVpFUiwge3VzZVZhbHVlOiBpbml0QnJvd3NlclRlc3RzLCBtdWx0aTogdHJ1ZX0pXG4gICAgXSk7XG5cbmV4cG9ydCBjb25zdCBBRERJVElPTkFMX1RFU1RfQlJPV1NFUl9QUk9WSURFUlM6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtcbiAgICAgIG5ldyBQcm92aWRlcihBUFBfSUQsIHt1c2VWYWx1ZTogJ2EnfSksXG4gICAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihEaXJlY3RpdmVSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9KSxcbiAgICAgIG5ldyBQcm92aWRlcihWaWV3UmVzb2x2ZXIsIHt1c2VDbGFzczogTW9ja1ZpZXdSZXNvbHZlcn0pLFxuICAgICAgTG9nLFxuICAgICAgVGVzdENvbXBvbmVudEJ1aWxkZXIsXG4gICAgICBuZXcgUHJvdmlkZXIoTmdab25lLCB7dXNlRmFjdG9yeTogY3JlYXRlTmdab25lfSksXG4gICAgICBuZXcgUHJvdmlkZXIoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBNb2NrTG9jYXRpb25TdHJhdGVneX0pLFxuICAgICAgbmV3IFByb3ZpZGVyKEFuaW1hdGlvbkJ1aWxkZXIsIHt1c2VDbGFzczogTW9ja0FuaW1hdGlvbkJ1aWxkZXJ9KSxcbiAgICBdKTtcblxuLyoqXG4gKiBEZWZhdWx0IGFwcGxpY2F0aW9uIHByb3ZpZGVycyBmb3IgdGVzdGluZyB3aXRob3V0IGEgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfU1RBVElDX0FQUExJQ0FUSU9OX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihYSFIsIHt1c2VDbGFzczogWEhSSW1wbH0pLFxuICAgICAgQURESVRJT05BTF9URVNUX0JST1dTRVJfUFJPVklERVJTXG4gICAgXSk7XG4iXX0=