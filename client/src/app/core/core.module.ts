import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AiService } from './services/ai.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, AiService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import in AppModule only.');
    }
  }
}

