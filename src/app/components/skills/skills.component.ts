import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  template: `<span class="skill">{{ name }}</span>`,
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  @Input() name: string = '';
}
