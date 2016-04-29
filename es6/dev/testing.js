/**
 * @module
 * @description
 * This module is used for writing tests for applications written in Angular.
 *
 * This module is not included in the `angular2` module; you must import the test module explicitly.
 *
 */
export * from './src/testing/testing';
export { ComponentFixture, TestComponentBuilder, ComponentFixtureAutoDetect, ComponentFixtureNoNgZone } from './src/testing/test_component_builder';
export * from './src/testing/test_injector';
export * from './src/testing/fake_async';
export { MockViewResolver } from 'angular2/src/mock/view_resolver_mock';
export { MockXHR } from 'angular2/src/compiler/xhr_mock';
export { MockNgZone } from 'angular2/src/mock/ng_zone_mock';
export { MockApplicationRef } from 'angular2/src/mock/mock_application_ref';
export { MockDirectiveResolver } from 'angular2/src/mock/directive_resolver_mock';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOFhvWEtpa1oudG1wL2FuZ3VsYXIyL3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUNILGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsU0FDRSxnQkFBZ0IsRUFDaEIsb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix3QkFBd0IsUUFDbkIsc0NBQXNDLENBQUM7QUFDOUMsY0FBYyw2QkFBNkIsQ0FBQztBQUM1QyxjQUFjLDBCQUEwQixDQUFDO0FBRXpDLFNBQVEsZ0JBQWdCLFFBQU8sc0NBQXNDLENBQUM7QUFDdEUsU0FBUSxPQUFPLFFBQU8sZ0NBQWdDLENBQUM7QUFDdkQsU0FBUSxVQUFVLFFBQU8sZ0NBQWdDLENBQUM7QUFDMUQsU0FBUSxrQkFBa0IsUUFBTyx3Q0FBd0MsQ0FBQztBQUMxRSxTQUFRLHFCQUFxQixRQUFPLDJDQUEyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgbW9kdWxlIGlzIHVzZWQgZm9yIHdyaXRpbmcgdGVzdHMgZm9yIGFwcGxpY2F0aW9ucyB3cml0dGVuIGluIEFuZ3VsYXIuXG4gKlxuICogVGhpcyBtb2R1bGUgaXMgbm90IGluY2x1ZGVkIGluIHRoZSBgYW5ndWxhcjJgIG1vZHVsZTsgeW91IG11c3QgaW1wb3J0IHRoZSB0ZXN0IG1vZHVsZSBleHBsaWNpdGx5LlxuICpcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvdGVzdGluZy90ZXN0aW5nJztcbmV4cG9ydCB7XG4gIENvbXBvbmVudEZpeHR1cmUsXG4gIFRlc3RDb21wb25lbnRCdWlsZGVyLFxuICBDb21wb25lbnRGaXh0dXJlQXV0b0RldGVjdCxcbiAgQ29tcG9uZW50Rml4dHVyZU5vTmdab25lXG59IGZyb20gJy4vc3JjL3Rlc3RpbmcvdGVzdF9jb21wb25lbnRfYnVpbGRlcic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy90ZXN0aW5nL3Rlc3RfaW5qZWN0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvdGVzdGluZy9mYWtlX2FzeW5jJztcblxuZXhwb3J0IHtNb2NrVmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay92aWV3X3Jlc29sdmVyX21vY2snO1xuZXhwb3J0IHtNb2NrWEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyX21vY2snO1xuZXhwb3J0IHtNb2NrTmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9uZ196b25lX21vY2snO1xuZXhwb3J0IHtNb2NrQXBwbGljYXRpb25SZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL21vY2tfYXBwbGljYXRpb25fcmVmJztcbmV4cG9ydCB7TW9ja0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jayc7XG4iXX0=