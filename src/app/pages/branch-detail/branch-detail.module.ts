import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchDetailPageRoutingModule } from './branch-detail-routing.module';

import { BranchDetailPage } from './branch-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchDetailPageRoutingModule
  ],
  declarations: [BranchDetailPage]
})
export class BranchDetailPageModule {}
