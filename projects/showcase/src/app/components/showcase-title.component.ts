import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-showcase-title',
    template: `
	          <div class="pl-2 pt-2 pb-2">
                <h4 class="d-inline"><ng-content></ng-content></h4>
                <a href="https://github.com/systelab/systelab-charts/tree/master/src/app/showcase/components/{{href}}"
                   target="_blank">
                    <img class="d-inline" src="gh.ico" alt="View on GitHub" width="18px" height="18px">
                </a>
            </div>
	          `,
    styles: [`
	img {
      position: relative;
			top: -4px;
			left: 4px;
	}`],
    standalone: false
})
export class ShowcaseTitleComponent {
	@Input() title = '';
	@Input() href = '';
}
